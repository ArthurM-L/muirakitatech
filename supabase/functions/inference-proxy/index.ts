const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Read API key from environment
  const apiKey = Deno.env.get("INFERENCE_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "INFERENCE_API_KEY environment variable is not set" }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }

  // Resolve target URL: header first, then query param (SSE/EventSource fallback)
  const url = new URL(req.url);
  const targetUrl =
    req.headers.get("x-inf-target-url") ?? url.searchParams.get("__inf_target");

  if (!targetUrl) {
    return new Response(
      JSON.stringify({
        error:
          "Missing target URL. Provide it via the x-inf-target-url header or the __inf_target query parameter.",
      }),
      {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }

  // Build forwarded headers — copy everything except 'host', then inject auth
  const forwardHeaders = new Headers();
  for (const [key, value] of req.headers.entries()) {
    if (key.toLowerCase() === "host") continue;
    forwardHeaders.set(key, value);
  }
  forwardHeaders.set("Authorization", `Bearer ${apiKey}`);

  // Forward the request; pass body through for methods that carry one
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const upstreamResponse = await fetch(targetUrl, {
    method: req.method,
    headers: forwardHeaders,
    body: hasBody ? req.body : undefined,
    // @ts-ignore — Deno fetch supports duplex streaming
    duplex: "half",
  });

  // Stream the response back, preserving status, headers, and body
  const responseHeaders = new Headers(CORS_HEADERS);
  for (const [key, value] of upstreamResponse.headers.entries()) {
    responseHeaders.set(key, value);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
});
