DROP DATABASE IF EXISTS crying;
CREATE DATABASE crying;

\c crying;

CREATE TABLE pins (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  title VARCHAR,
  hex VARCHAR,
  lat DECIMAL,
  lng DECIMAL,
  heading INTEGER,
  pitch INTEGER,
  zoom INTEGER
);
