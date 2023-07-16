-- Deploy bib:init to pg

BEGIN;
CREATE TYPE user_role AS ENUM ('utilisateur', 'admin');


CREATE TABLE "author"
("id"  INT PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
 "author_name" TEXT NOT NULL,
 "author_dob" TIMESTAMP NOT NULL,
 "author_nationality" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
 );


 CREATE TABLE "user"
("id"  INT PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
 "user_name" TEXT NOT NULL,
 "user_email" TEXT NOT NULL UNIQUE CHECK (user_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
 "user_password" TEXT NOT NULL,
 "user_role" user_role NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);

 CREATE TABLE "book" 
("id"  INT PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
 "book_summary" TEXT NOT NULL,
 "publication_year" INT NOT NULL,
 "author_id" INT NOT NULL REFERENCES "author"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);

 CREATE TABLE "gender"
("id"  INT PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
 "gender_name" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);

CREATE TABLE "book_gender"
("id"  INT PRIMARY KEY  GENERATED ALWAYS AS IDENTITY,
"book_id" INT NOT NULL REFERENCES "book"("id"),
 "gender_id" INT NOT NULL REFERENCES "gender"("id"),
 UNIQUE ("book_id", "gender_id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "rating"
("id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 "user_id" INT NOT NULL REFERENCES "user"("id"),
 "book_id" INT NOT NULL REFERENCES "book"("id"),
 "rating" INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);


CREATE TABLE "comment"
("id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 "content" TEXT NOT NULL,
 "book_id" INT NOT NULL REFERENCES "book"("id"),
 "user_id" INT NOT NULL REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);

 CREATE TABLE "loan"
("id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 "loan_date" TIMESTAMP,
 "return_date" TIMESTAMP CHECK(return_date > loan_date),
 "user_id" INT NOT NULL REFERENCES "user"("id"),
 "book_id" INT NOT NULL REFERENCES "book"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ);




COMMIT;
