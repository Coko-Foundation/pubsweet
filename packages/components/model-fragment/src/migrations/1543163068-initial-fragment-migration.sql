CREATE TABLE fragments (
  id UUID PRIMARY KEY,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE,
  fragment_type TEXT,
  fragments JSONB,
  owners JSONB,
  type TEXT NOT NULL
);