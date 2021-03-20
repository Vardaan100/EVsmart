
CREATE DATABASE EVsmart;

-- download extension "uuid-ossp"
create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_firstname VARCHAR(245) NOT NULL,
    user_lastname VARCHAR(245) NOT NULL,
    user_phone BIGINT NOT NULL UNIQUE,
    user_email VARCHAR(245) NOT NULL UNIQUE,
    user_password VARCHAR(64) NOT NULL,
    user_verification BOOLEAN NOT NULL DEFAULT false,
    user_role VARCHAR(255) NOT NUll DEFAULT 'Normal',
    cs_status BOOLEAN NOT NULL DEFAULT false
);

--timestamp trigger for user
CREATE OR REPLACE FUNCTION trigger_set_timestamp_users()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger  forusers
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_users();

-- charging stion table
CREATE TABLE charging_station(
  cs_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cs_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cs_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  cs_phone BIGINT NOT NULL,
  cs_openat TIME NOT NULL DEFAULT '00:00:00',
  cs_closeat TIME NOT NULL DEFAULT '23:59:59',
  cs_longitude NUMERIC(12,9) NOT NULL,
  cs_latitude NUMERIC(12,9) NOT NULL,
  cs_cost NUMERIC(9,2) NOT NULL,
  cs_verification BOOLEAN NOT NULL DEFAULT false,
  user_id uuid UNIQUE NOT NULL REFERENCES users (user_id)
);


--timestamp trigger for CS
CREATE OR REPLACE FUNCTION trigger_set_timestamp_cs()
RETURNS TRIGGER AS $$
BEGIN
  NEW.cs_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger  for CS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON charging_station
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_cs();

-- Review Table
CREATE TABLE review(
  review_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  review_star NUMERIC(2,1) NOT NULL,
  review_comment VARCHAR(245) NOT NULL,
  cs_id uuid UNIQUE NOT NULL REFERENCES charging_station (cs_id),
  user_id uuid UNIQUE NOT NULL REFERENCES users (user_id)
);

--timestamp trigger for review table
CREATE OR REPLACE FUNCTION trigger_set_timestamp_review()
RETURNS TRIGGER AS $$
BEGIN
  NEW.review_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger for review table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON review
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_review();

--table for message format 
CREATE TABLE message_format(
    message_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    message_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    message_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    message_name VARCHAR(245) NOT NULL ,
    message_format VARCHAR(245) NOT NULL,
    user_id uuid NOT NULL REFERENCES users (user_id)
    
);

--timestamp trigger for message_format table
CREATE OR REPLACE FUNCTION trigger_set_timestamp_message()
RETURNS TRIGGER AS $$
BEGIN
  NEW.message_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger for message_format table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON message_format
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_message();

--Table for res. from api sms
CREATE TABLE message_res(
    res_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    res_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    res_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    res_return BOOLEAN NOT NULL,
    req_id VARCHAR(245) NOT NULL ,
    res_message VARCHAR(245) NOT NULL,
    message_sent VARCHAR(245) NOT NULL ,
    cs_phone BIGINT NOT NULL ,
    user_phone BIGINT NOT NULL ,
    user_id uuid NOT NULL REFERENCES users (user_id),
    cs_id uuid  NOT NULL REFERENCES charging_station (cs_id),
    message_name  VARCHAR(245) NOT NULL
);

--timestamp trigger for message_res table
CREATE OR REPLACE FUNCTION trigger_set_timestamp_messageres()
RETURNS TRIGGER AS $$
BEGIN
  NEW.res_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger for message_res table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON message_res
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_messageres();
-- Table to otp
CREATE TABLE otp(
    otp_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    otp_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    otp_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    otp_phone BIGINT NOT NULL,
    otp_token VARCHAR(245) NOT NULL,
    otp_expire BIGINT NOT NULL ,
    expiry_status BOOLEAN NOT NULL DEFAULT false,
    otp_hash VARCHAR(1000) NOT NULL,
    otp_ver BOOLEAN NOT NULL DEFAULT false,
    message_sent VARCHAR(245) NOT NULL ,
    message_name  VARCHAR(245) NOT NULL,
    sms_res VARCHAR(1000) NOT NULL
);

--timestamp trigger for otp table
CREATE OR REPLACE FUNCTION trigger_set_timestamp_otp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.otp_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger for otp table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON otp
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_otp();
-- test chargins station
INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00:00','22:00:00',-45.7895442,-89.448245,800.56,'f720a607-53fb-4505-a622-6ac8498dbe29');

INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00','22:00:00',45.785442,-88.448245,800.5656,'30ad5faa-7341-47d2-b806-7a887d3fdd38');

INSERT INTO charging_station(cs_phone,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,45.7895442,-89.4248245,800.56,'757370fc-81cd-4b63-b470-4a5c1280cc37');

INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00:00','22:00:00',45.7895442,-89.448245,800.56,'399baafe-8a6c-48ac-affd-101f2c64f59b');
-- test users
INSERT INTO users(user_firstname,user_lastname,user_phone,user_email,user_password)
VALUES('naman','gupta',99996420326,'guptanaman401@gmail.com','123456');

ALTER TABLE charging_station
ADD user_email VARCHAR(245) NOT NULL REFERENCES users (user_email) DEFAULT users (user_email);

ALTER TABLE message_res
ADD COLUMN message_name VARCHAR(255) NOT NUll ;

-- --ALTER TABLE users
-- ALTER TABLE users
-- DROP COLUMN user_create_date;
-- DROP COLUMN user_updated_date;
-- ALTER TABLE users
-- ADD user_verification BOOLEAN NOT NULL DEFAULT false;
-- ALTER TABLE users
-- ADD user_role CHAR(255) NOT NUll DEFAULT 'Normal';
-- ALTER TABLE users
-- ADD user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- ALTER TABLE users
-- ADD user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE otp
ADD expiry_status BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE charging_station
ALTER COLUMN cs_longitude NUMERIC(12,9) NOT NULL;
ALTER TABLE charging_station
ALTER COLUMN cs_latitude NUMERIC(12,9) NOT NULL;
ALTER TABLE charging_station
ALTER COLUMN user_id uuid FOREIGN KEY UNIQUE NOT NULL REFERENCES users (user_id);
-- --UPADTE THE ROWS
-- UPDATE users
-- SET user_password = 123456789
-- WHERE user_email = 'guptanaman40@gmail.com';


INSERT INTO message_format(message_name,message_format,user_id)
VALUES("booked","Hi Suraj ,Naman Gupta ${name}has Choosed Your Charging station to Charge Car Please Contact him Regarding Any Issue below mentioned number (9990372304)","0e1c73f7-b174-4c4a-a9a7-aa3e68280690");