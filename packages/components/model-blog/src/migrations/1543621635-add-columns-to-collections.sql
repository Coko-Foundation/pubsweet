ALTER TABLE collections
ADD COLUMN title TEXT,
ADD COLUMN published BOOLEAN,
ADD COLUMN filtered TEXT,
ADD COLUMN non_public_property TEXT;