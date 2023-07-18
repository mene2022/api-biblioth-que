-- Revert bib:status_column from pg

BEGIN;

ALTER TABLE "loan"
DROP COLUMN status;
DROP TYPE loan_status;

COMMIT;
