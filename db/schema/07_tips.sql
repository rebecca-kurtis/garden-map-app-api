-- DROP and CREATE tips TABLE
DROP TABLE IF EXISTS tips CASCADE;

CREATE TABLE tips (
tips_id SERIAL PRIMARY KEY NOT NULL,
user_id INT,
FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE,
description VARCHAR NOT NULL
);  