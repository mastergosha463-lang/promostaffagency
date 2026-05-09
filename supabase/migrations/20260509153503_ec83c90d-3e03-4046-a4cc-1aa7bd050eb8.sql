ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_len CHECK (char_length(name) <= 200),
  ADD CONSTRAINT leads_phone_len CHECK (char_length(phone) <= 50),
  ADD CONSTRAINT leads_event_type_len CHECK (char_length(event_type) <= 200),
  ADD CONSTRAINT leads_message_len CHECK (char_length(message) <= 2000);

ALTER TABLE public.page_views
  ADD CONSTRAINT page_views_path_len CHECK (char_length(page_path) <= 500),
  ADD CONSTRAINT page_views_referrer_len CHECK (char_length(referrer) <= 2000),
  ADD CONSTRAINT page_views_user_agent_len CHECK (char_length(user_agent) <= 1000),
  ADD CONSTRAINT page_views_session_id_len CHECK (char_length(session_id) <= 200);

ALTER TABLE public.client_errors
  ADD CONSTRAINT client_errors_message_len CHECK (char_length(message) <= 2000),
  ADD CONSTRAINT client_errors_stack_len CHECK (char_length(stack) <= 10000),
  ADD CONSTRAINT client_errors_url_len CHECK (char_length(url) <= 2000),
  ADD CONSTRAINT client_errors_source_len CHECK (char_length(source) <= 2000),
  ADD CONSTRAINT client_errors_page_path_len CHECK (char_length(page_path) <= 500),
  ADD CONSTRAINT client_errors_user_agent_len CHECK (char_length(user_agent) <= 1000),
  ADD CONSTRAINT client_errors_kind_len CHECK (char_length(kind) <= 100);