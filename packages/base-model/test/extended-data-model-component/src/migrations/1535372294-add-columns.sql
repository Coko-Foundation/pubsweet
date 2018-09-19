ALTER TABLE manuscripts
ADD COLUMN published BOOLEAN,
ADD COLUMN approved_by_author BOOLEAN,
ADD COLUMN doi TEXT;