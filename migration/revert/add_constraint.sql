BEGIN;

  ALTER TABLE "comment"
  DROP CONSTRAINT comment_book_id_fkey;

  ALTER TABLE "loan"
  DROP CONSTRAINT loan_book_id_fkey;

  ALTER TABLE "rating"
  DROP CONSTRAINT rating_book_id_fkey;

  ALTER TABLE "book_gender" 
  DROP CONSTRAINT book_gender_book_id_fkey;


  ALTER TABLE "book_gender"
  ADD CONSTRAINT book_gender_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id");

  ALTER TABLE "rating"
  ADD CONSTRAINT rating_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id");

  ALTER TABLE "loan"
  ADD CONSTRAINT loan_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id");

  ALTER TABLE "comment"
  ADD CONSTRAINT comment_book_id_fkey
  FOREIGN KEY (book_id) REFERENCES "book" ("id");

COMMIT;
