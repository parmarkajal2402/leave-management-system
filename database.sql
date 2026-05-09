CREATE DATABASE leave_pro;

USE leave_pro;


/* USERS TABLE */

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(50) NOT NULL,

    password VARCHAR(50) NOT NULL

);


/* DEFAULT LOGIN */

INSERT INTO users
(
    username,
    password
)

VALUES
(
    'admin',
    'admin123'
);


/* LEAVES TABLE */

CREATE TABLE leaves (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    type VARCHAR(50) NOT NULL,

    from_date DATE NOT NULL,

    to_date DATE NOT NULL,

    reason TEXT NOT NULL,

    status VARCHAR(20) DEFAULT 'Pending'

);