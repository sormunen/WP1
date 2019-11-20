/*  CREATE DATABASE wp2;

 \c wp2; */
CREATE TABLE Topic(
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
detail VARCHAR(255),
startl TIMESTAMP,
endl TIMESTAMP,
src text,
inprog boolean,
posttime TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);




INSERT INTO topic(title, detail, src, inprog) VALUES('Initialisation-Title', 'Initialisation-Description', 'www.google.com', true);
