CREATE TABLE IF NOT EXISTS role (
   id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) UNIQUE,
    birthday DATE,
    role_id INT REFERENCES role (id) ON DELETE SET NULL
    );

CREATE TABLE IF NOT EXISTS countries (
                           id SERIAL PRIMARY KEY,
                           country VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS cities (
                        id SERIAL PRIMARY KEY,
                        city VARCHAR(255) UNIQUE NOT NULL,
                        country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hotels (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
                        phone VARCHAR(50) UNIQUE NOT NULL,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        website VARCHAR(255),
                        rating DECIMAL(3, 2) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS rooms (
                       id SERIAL PRIMARY KEY,
                       hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
                       name VARCHAR(255) NOT NULL,
                       is_active BOOLEAN NOT NULL DEFAULT TRUE,
                       facilities TEXT NOT NULL,
                       price_per_night DECIMAL(10, 2) NOT NULL,
                       capacity INTEGER NOT NULL,
                       room_type VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS bookings (
                          id SERIAL PRIMARY KEY,
                          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                          room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
                          check_in DATE NOT NULL,
                          check_out DATE NOT NULL,
                          total_price DECIMAL(10, 2) NOT NULL
);



CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_cities_city ON cities(city);

DROP  table if exists booking;


CREATE TABLE user_booking (
                         id SERIAL PRIMARY KEY,
                         full_name VARCHAR(50) NOT NULL,
                         date_of_birth DATE NOT NULL,
                         gender BOOLEAN NOT NULL,
                         phone_number VARCHAR(30),
                         email VARCHAR(255) NOT NULL,
                         check_in_date DATE NOT NULL,
                         check_out_date DATE NOT NULL,
                         num_of_guests INT CHECK (num_of_guests >= 1 AND num_of_guests <= 5),
                         room_type VARCHAR(50),
                         breakfast_included BOOLEAN DEFAULT FALSE,
                         smoking_preference BOOLEAN DEFAULT FALSE,
                         accessibility_features_required BOOLEAN DEFAULT FALSE,
                         extra_bed_needed BOOLEAN DEFAULT FALSE,
                         room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
                         total_price DECIMAL(10, 2) NOT NULL
);




