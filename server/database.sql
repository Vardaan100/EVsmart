CREATE DATABASE evsmart;
-- download extension "uuid-ossp"
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(245) NOT NULL,
    user_email VARCHAR(245) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    user_type VARCHAR(400) NOT NULL
);

-- test users
INSERT INTO users(user_name,user_email,
user_password,user_type) VALUES ('naman',
'guptanaman40','4566874','Service Provider');