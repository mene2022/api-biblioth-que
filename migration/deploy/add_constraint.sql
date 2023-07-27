-- Deploy bib:add_constraint to pg

BEGIN;

  ALTER TABLE "book_gender" 
  DROP CONSTRAINT book_gender_book_id_fkey;
  
  ALTER TABLE "rating"
  DROP CONSTRAINT rating_book_id_fkey;

  ALTER TABLE "loan"
  DROP CONSTRAINT loan_book_id_fkey;

  ALTER TABLE "comment"
  DROP CONSTRAINT comment_book_id_fkey;

  
  ALTER TABLE "book_gender"
  ADD CONSTRAINT book_gender_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id") ON DELETE CASCADE;

   ALTER TABLE "rating"
  ADD CONSTRAINT rating_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id") ON DELETE CASCADE;

  ALTER TABLE "loan"
  ADD CONSTRAINT loan_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id") ON DELETE CASCADE;

  ALTER TABLE "comment"
  ADD CONSTRAINT comment_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id") ON DELETE CASCADE;

COMMIT;
