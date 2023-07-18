-- Deploy bib:status_column to pg

BEGIN;

CREATE TYPE loan_status AS ENUM ('borrowed', 'returned');

ALTER TABLE loan
ADD COLUMN status loan_status;



COMMIT;
