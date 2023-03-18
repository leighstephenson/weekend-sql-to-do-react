--Add table name, keys and values here

CREATE TABLE taskList (
    "id" serial PRIMARY KEY,
    "taskName" VARCHAR (400) NOT NULL,
    "date" VARCHAR (50),
    "completionStatus" VARCHAR (50),
); --Currently getting a syntax error here?

INSERT INTO "taskList" ("name", "date", "completionStatus")
VALUES (1, 'Schedule appointment', '3/19/2023', 'N');