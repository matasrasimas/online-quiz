#@(#) script.ddl

DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Quizzes;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (50) NOT NULL,
	password varchar (256) NOT NULL,
	email varchar (100) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE quizzes
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(100) NOT NULL,
    description varchar(200) NOT NULL,
    category varchar(100) NOT NULL,
	image_url varchar(256),
	user_id int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_quizzes FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE questions
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(200) NOT NULL,
	quiz_id int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_questions FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
);

CREATE TABLE answers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (100) NOT NULL,
	isCorrect boolean NOT NULL,
	question_id int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_answers FOREIGN KEY (question_id) REFERENCES questions (id)
);