CREATE DATABASE todo_database

CREATE TABLE todo(
	todo_id SERIAL PRIMARY KEY,
	mission VARCHAR(255) NOT NULL
);

Select * from todo;