ALTER TABLE users
ADD COLUMN defaultIdentity TEXT;

CREATE TABLE identities (
  id UUID PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES user,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated TIMESTAMP WITH TIME ZONE,
  type TEXT NOT NULL, -- local, orcid
  identifier TEXT, -- e.g. orcid ID
  name TEXT,
  aff TEXT,
  password_hash TEXT,
  email TEXT UNIQUE,
  oauth JSONB
);

