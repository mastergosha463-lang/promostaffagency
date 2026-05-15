UPDATE public.page_views SET
  page_path = left(page_path, 500),
  referrer = left(referrer, 2000),
  user_agent = left(user_agent, 500),
  session_id = left(session_id, 128);

UPDATE public.client_errors SET
  kind = left(kind, 100),
  message = left(message, 2000),
  stack = left(stack, 10000),
  url = left(url, 2000);

ALTER TABLE public.page_views
  ADD CONSTRAINT pv_page_path_len CHECK (char_length(page_path) <= 500),
  ADD CONSTRAINT pv_referrer_len CHECK (referrer IS NULL OR char_length(referrer) <= 2000),
  ADD CONSTRAINT pv_user_agent_len CHECK (user_agent IS NULL OR char_length(user_agent) <= 500),
  ADD CONSTRAINT pv_session_id_len CHECK (session_id IS NULL OR char_length(session_id) <= 128);

ALTER TABLE public.client_errors
  ADD CONSTRAINT ce_kind_len CHECK (char_length(kind) <= 100),
  ADD CONSTRAINT ce_message_len CHECK (message IS NULL OR char_length(message) <= 2000),
  ADD CONSTRAINT ce_stack_len CHECK (stack IS NULL OR char_length(stack) <= 10000),
  ADD CONSTRAINT ce_url_len CHECK (url IS NULL OR char_length(url) <= 2000);