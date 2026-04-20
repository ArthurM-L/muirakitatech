CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact message
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(message) > 0 AND length(message) <= 5000
    AND (email IS NULL OR length(email) <= 320)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (company IS NULL OR length(company) <= 200)
  );

-- No public read/update/delete: contact messages are private to admins (via Supabase dashboard)