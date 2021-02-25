
CREATE DATABASE EVsmart;

-- download extension "uuid-ossp"
create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_firstname VARCHAR(245) NOT NULL,
    user_lastname VARCHAR(245) NOT NULL,
    user_phone BIGINT NOT NULL,
    user_email VARCHAR(245) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    user_verification BOOLEAN NOT NULL DEFAULT false,
    user_role CHAR(255) NOT NUll DEFAULT 'Normal',
    user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE charging_station(
  cs_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cs_phone BIGINT NOT NULL,
  cs_openat TIME NOT NULL,
  cs_closeat TIME NOT NULL,
  cs_address VARCHAR(245) NOT NULL,
  cs_longitude BIGINT NOT NULL,
  cs_latitude BIGINT NOT NULL,
  cs_cost NUMERIC(9,2) NOT NULL,
  cs_verification BOOLEAN NOT NULL DEFAULT false,
  cs_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cs_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  cs_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)
-- test users
INSERT INTO users(user_firstname,user_lastname,user_phone,user_email,user_password)
VALUES('naman','gupta',9999640326,'guptanaman40@gmail.com','123456');

--timestamp trigger
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger 
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- --ALTER TABLE users
-- ALTER TABLE users
-- DROP COLUMN user_create_date;
-- ALTER TABLE users
-- DROP COLUMN user_updated_date;
-- ALTER TABLE users
-- ADD user_verification BOOLEAN NOT NULL DEFAULT false;
-- ALTER TABLE users
-- ADD user_role CHAR(255) NOT NUll DEFAULT 'Normal';
-- ALTER TABLE users
-- ADD user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- ALTER TABLE users
-- ADD user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- --UPADTE THE ROWS
-- UPDATE users
-- SET user_password = 123456789
-- WHERE user_email = 'guptanaman40@gmail.com';