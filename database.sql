--Add table name, keys and values here

CREATE TABLE tasklist (
    "id" serial PRIMARY KEY,
    "taskname" VARCHAR (400) NOT NULL,
    "date" VARCHAR (50),
    "completionstatus" VARCHAR (50)
);

INSERT INTO "tasklist" ("taskname", "date", "completionstatus")
VALUES ('Schedule appointment', '3/19/2023', 'N');