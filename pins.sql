DROP DATABASE IF EXISTS crying;
CREATE DATABASE crying;

\c crying;

CREATE TABLE pins (
  ID SERIAL PRIMARY KEY,
  uid VARCHAR,
  user_id INTEGER,
  name VARCHAR,
  title VARCHAR,
  hex VARCHAR,
  lat DECIMAL,
  lng DECIMAL,
  heading INTEGER,
  pitch INTEGER,
  zoom INTEGER
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR
);

INSERT INTO users (username)
  VALUES ('kray');
