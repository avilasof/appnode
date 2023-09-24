CREATE DATABASE avilasof_links;

USE avilasof_links;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100)
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY COLUMN id INT(11) AUTO_INCREMENT NOT NULL;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE  links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE  links
    ADD PRIMARY KEY (id);

ALTER TABLE links MODIFY COLUMN id int(11) auto_increment NOT NULL;

