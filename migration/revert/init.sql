-- Deploy bib:init to pg

BEGIN;


DROP TABLE "loan","comment","rating","book_gender","gender","book", "user", "author";
DROP TYPE  user_role ;


COMMIT;
