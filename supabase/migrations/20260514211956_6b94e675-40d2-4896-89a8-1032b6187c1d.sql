
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_name_len;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_phone_len;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_event_type_len;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_message_len;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_phone_format;

UPDATE public.leads SET name = left(name, 100) WHERE char_length(name) > 100;
UPDATE public.leads SET event_type = left(event_type, 100) WHERE char_length(event_type) > 100;
UPDATE public.leads SET phone = left(phone, 32) WHERE char_length(phone) > 32;
UPDATE public.leads SET message = left(message, 1000) WHERE message IS NOT NULL AND char_length(message) > 1000;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_phone_len CHECK (char_length(phone) BETWEEN 6 AND 32),
  ADD CONSTRAINT leads_event_type_len CHECK (char_length(event_type) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_message_len CHECK (message IS NULL OR char_length(message) <= 1000),
  ADD CONSTRAINT leads_phone_format CHECK (phone ~ '^[+\d\s\-()]{6,32}$');
