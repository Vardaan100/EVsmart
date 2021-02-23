CREATE DATABASE EVsmart;

-- download extension "uuid-ossp"
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_firstname VARCHAR(245) NOT NULL,
    user_lastname VARCHAR(245) NOT NULL,
    user_phone BIGINT NOT NULL,
    user_email VARCHAR(245) NOT NULL,
    user_password VARCHAR(64) NOT NULL
);

-- test users
INSERT INTO
    users(
        user_firstname,
        user_lastname,
        user_phone,
        user_email,
        user_password
    )
VALUES
    (
        'vardaan',
        'magon',
        9999640326,
        'vardaanmagon1@gmail.com',
        'ItsWorking'
    );