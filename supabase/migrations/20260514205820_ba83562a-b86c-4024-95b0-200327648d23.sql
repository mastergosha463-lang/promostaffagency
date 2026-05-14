-- Add missing status constraint to leads table
ALTER TABLE public.leads
  ADD CONSTRAINT leads_status_valid CHECK (status IN ('new', 'in_progress', 'resolved', 'spam'));