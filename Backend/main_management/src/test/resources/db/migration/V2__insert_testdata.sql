INSERT INTO role (name) VALUES
    ('USER');

INSERT INTO users (name, surname, email, password, phone, birthday, role_id) VALUES
                                                                                 ( 'John', 'Doe', 'johndoe@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-456-7890-74', '1980-01-15', 1),
                                                                                 ( 'Jane', 'Smith', 'janesmith@yahoo.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-321-6540-87', '1985-03-22', 1),
                                                                                 ('Robert', 'Johnson', 'robertj@hotmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-555-7890-12', '1978-07-14', 1),
                                                                                 ('Emily', 'Davis', 'emilyd@aol.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-456-1237-90', '1990-05-10', 1),
                                                                                 ('Michael', 'Brown', 'michaelb@protonmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-789-4562-30', '1982-02-28',1),
                                                                                 ('Jessica', 'Taylor', 'jtaylor@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-987-6543-20', '1995-09-13',1),
                                                                                 ('William', 'Anderson', 'william.anderson@company.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-876-4321-09', '1988-11-01',1);


-- Insert countries
INSERT INTO countries (country) VALUES
                                    ('Germany'),
                                    ('France'),
                                    ('Italy');

-- Insert cities
INSERT INTO cities (city, country_id) VALUES
                                          ( 'Berlin', 1),
                                          ( 'Munich', 1),
                                          ( 'Paris', 2),
                                          ( 'Lyon', 2),
                                          ( 'Rome', 3),
                                          ( 'Milan', 3);


INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Berlin Grand Hotel', '1 Alexanderplatz, Berlin', 1, '+(49)-123-111-001', 'info@berlingrandhotel.com', 'https://www.berlingrandhotel.com', 4.5),
                                                                               ('Hotel Berlin Mitte', '10 Friedrichstrasse, Berlin', 1, '+(49)-123-111-002', 'contact@hotelberlinmitte.com', 'https://www.hotelberlinmitte.com', 4.3),
                                                                               ('Berlin Plaza Hotel', '50 Kurfürstendamm, Berlin', 1, '+(49)-123-111-003', 'stay@berlinplaza.com', 'https://www.berlinplaza.com', 2.0),
                                                                               ('Central Berlin Stay', '5 Potsdamer Platz, Berlin', 1, '+(49)-123-111-004', 'reservations@centralberlinstay.com', NULL, 4.1);
INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ( 'Munich Palace Hotel', '20 Leopoldstrasse, Munich', 2, '+(49)-124-222-001', 'info@munichpalace.com', 'https://www.munichpalace.com', 4.6),
                                                                               ( 'Bavarian Inn', '15 Marienplatz, Munich', 2, '+(49)-124-222-002', 'stay@bavarianinn.com', 'https://www.bavarianinn.com', 3.4),
                                                                               ( 'Hotel Munich City', '100 Theresienhöhe, Munich', 2, '+(49)-124-222-003', 'contact@hotelmunichcity.com', 'https://www.hotelmunichcity.com', 4.2),
                                                                               ( 'Munich Central Hotel', '30 Bahnhofplatz, Munich', 2, '+(49)-124-222-004', 'reservations@munichcentralhotel.com', NULL, 4.3);
INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Paris Elegance Hotel', '10 Rue de Rivoli, Paris', 3, '+(33)-125-333-001', 'info@pariselegance.com', 'https://www.pariselegance.com', 2.7),
                                                                               ('Hotel Parisian Chic', '25 Avenue des Champs-Élysées, Paris', 3, '+(33)-125-333-002', 'contact@parisianchic.com', 'https://www.parisianchic.com', 4.5),
                                                                               ('The Paris Grand', '5 Boulevard Haussmann, Paris', 3, '+(33)-125-333-003', 'stay@parisgrand.com', 'https://www.parisgrand.com', 3.4),
                                                                               ('Central Paris Hotel', '12 Place de la Concorde, Paris', 3, '+(33)-125-333-004', 'reservations@centralparishotel.com', NULL, 4.6);


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 1, 'Executive Room', 'WiFi, AC, TV, Work Desk', 130.00, 2, 'Executive'),
                                                                                         (1, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         (1, 'Suite Room', 'WiFi, AC, TV, Minibar, Balcony', 220.00, 4, 'Suite'),
                                                                                         (1, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 140.00, 3, 'Deluxe');

-- Berlin Plaza Hotel Rooms
INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 2, 'Economy Room', 'WiFi, AC', 70.00, 2, 'Economy'),
                                                                                         (2, 'Standard Room', 'WiFi, AC, TV', 85.00, 2, 'Standard'),
                                                                                         ( 2, 'Family Room', 'WiFi, AC, TV, Extra Bed', 110.00, 4, 'Family'),
                                                                                         ( 2, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 130.00, 3, 'Deluxe');

-- Central Berlin Stay Rooms
INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 3, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         ( 3, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 250.00, 5, 'Suite'),
                                                                                         ( 3, 'Family Room', 'WiFi, AC, TV, Minibar, Extra Bed', 170.00, 4, 'Family'),
                                                                                         ( 3, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 150.00, 3, 'Deluxe');

INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 4, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 160.00, 2, 'Deluxe'),
                                                                                         ( 4, 'Suite Room', 'WiFi, AC, TV, Minibar, Balcony', 250.00, 4, 'Suite');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 5, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         ( 5, 'Economy Room', 'WiFi, AC', 75.00, 2, 'Economy');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 6, 'Executive Room', 'WiFi, AC, TV, Work Desk', 130.00, 2, 'Executive'),
                                                                                         ( 6, 'Standard Room', 'WiFi, AC, TV', 100.00, 2, 'Standard');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 7, 'Family Room', 'WiFi, AC, TV, Extra Bed', 160.00, 4, 'Family'),
                                                                                         (7, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 8, 'Economy Room', 'WiFi, AC', 70.00, 2, 'Economy'),
                                                                                         ( 8, 'Standard Room', 'WiFi, AC, TV', 85.00, 2, 'Standard');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 9, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 250.00, 4, 'Suite'),
                                                                                         ( 9, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 10, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         ( 10, 'Family Room', 'WiFi, AC, TV, Extra Bed', 140.00, 4, 'Family');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    ( 11, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 200.00, 3, 'Deluxe');

INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    ( 11, 'Standard Room', 'WiFi, AC', 90.00, 4, 'Standard');


INSERT INTO rooms ( hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         ( 12, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 150.00, 2, 'Deluxe'),
                                                                                         ( 12, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 220.00, 4, 'Suite');




INSERT INTO bookings ( user_id, room_id, check_in, check_out, total_price) VALUES
                                                                              ( 1, 1, '2024-10-01', '2024-10-05', 480.00),
                                                                              ( 2, 3, '2024-10-10', '2024-10-15', 1750.00),
                                                                              ( 3, 2, '2024-10-15', '2024-10-20', 1100.00),
                                                                              ( 4, 4, '2024-11-01', '2024-11-07', 3000.00),
                                                                              ( 5, 5, '2024-11-10', '2024-11-15', 2000.00),
                                                                              ( 6, 6, '2024-12-01', '2024-12-07', 1200.00),
                                                                              ( 7, 7, '2024-12-10', '2024-12-20', 900.00),
                                                                              ( 1, 8, '2025-05-10', '2025-05-15', 1400.00),
                                                                              ( 2, 9, '2025-06-01', '2025-06-05', 1050.00),
                                                                              ( 3, 10, '2025-06-10', '2025-06-15', 1950.00),
                                                                              ( 4, 10, '2025-06-20', '2025-06-25', 2800.00),
                                                                              ( 5, 11, '2025-07-01', '2025-07-07', 2200.00),                                                                  ( 6, 12, '2025-07-10', '2025-07-15', 1450.00),
                                                                              ( 7, 13, '2025-07-20', '2025-07-25', 2050.00),
                                                                              ( 1, 14, '2025-11-10', '2025-11-15', 2000.00),
                                                                              ( 2, 15, '2025-12-01', '2025-12-07', 4000.00),
                                                                              ( 3, 15, '2025-12-10', '2025-12-20', 3500.00),
                                                                              ( 4, 16, '2025-12-25', '2025-12-30', 1450.00);


INSERT INTO user_booking_test_data (
    full_name,
    date_of_birth,
    gender,
    phone_number,
    email,
    check_in_date,
    check_out_date,
    num_of_guests,
    room_type,
    breakfast_included,
    smoking_preference,
    accessibility_features_required,
    extra_bed_needed,
    total_price
)
VALUES
    ('Leo', '1900-01-01', FALSE, '000-000-000', 'johnsmith123@email.com', '2025-01-15', '2025-01-16', 1, 'Single', FALSE, FALSE, FALSE, FALSE, 1000.0),
    ('Leo', '1985-07-15', TRUE, '000-000-000', 'longemailaddress123@email.com', '2025-06-17', '2025-06-18', 3, 'Single', TRUE, TRUE, TRUE, TRUE, 380.0),
    ('Leo', '2025-01-15', FALSE, '000-000-000', 'abcd@email.com', '2026-01-15', '2026-01-16', 5, 'Single', FALSE, TRUE, FALSE, TRUE, 280.0),
    ('Alexander Williamson Smith', '1900-01-01', TRUE, '000-000-000', 'johnsmith124@email.com', '2025-01-15', '2025-06-18', 1, 'Double', TRUE, FALSE, TRUE, FALSE, 1000.0),
    ('Alexander Williamson Smith', '1985-07-15', FALSE, '000-000-000', 'longemailaddress124@email.com', '2025-06-17', '2026-01-16', 3, 'Double', FALSE, TRUE, FALSE, FALSE, 27690.0),
    ('Alexander Williamson Smith', '2025-01-15', TRUE, '000-000-000', 'abcf@email.com', '2026-01-15', '2026-01-16', 5, 'Double', TRUE, FALSE, TRUE, TRUE, 380.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1900-01-01', FALSE, '000-000-000', 'johnsmith125@email.com', '2025-01-15', '2026-01-16', 1, 'Suite', FALSE, TRUE, TRUE, TRUE, 1000.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1985-07-15', TRUE, '000-000-000', 'longemailaddress125@email.com', '2025-06-17', '2026-01-16', 3, 'Suite', TRUE, FALSE, FALSE, FALSE, 27790.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '2025-01-15', FALSE, '000-000-000', 'abcl@email.com', '2026-01-15', '2026-01-16', 5, 'Suite', FALSE, FALSE, TRUE, FALSE, 130.0),
    ('Leo', '1900-01-01', TRUE, '000-000-000', 'abcm@email.com', '2026-01-15', '2026-01-16', 5, 'Suite', TRUE, FALSE, FALSE, TRUE, 380.0),
    ('Alexander Williamson Smith', '1900-01-01', FALSE, '000-000-000', 'abcy@email.com', '2026-01-15', '2026-01-16', 3, 'Suite', FALSE, FALSE, TRUE, FALSE, 130.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1900-01-01', TRUE, '000-000-000', 'abck@email.com', '2025-06-17', '2025-06-18', 5, 'Suite', TRUE, FALSE, TRUE, TRUE, 380.0),
    ('Leo', '1985-07-15', FALSE, '000-000-000', 'abcg@email.com', '2026-01-15', '2026-01-16', 5, 'Suite', TRUE, FALSE, TRUE, TRUE, 380.0),
    ('Alexander Williamson Smith', '1985-07-15', TRUE, '000-000-000', 'abcs@email.com', '2026-01-15', '2026-01-16', 1, 'Suite', FALSE, TRUE, FALSE, FALSE, 130.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1985-07-15', FALSE, '000-000-000', 'abkg@email.com', '2025-06-17', '2025-06-18', 3, 'Single', FALSE, TRUE, FALSE, FALSE, 130.0),
    ('Leo', '1985-07-15', TRUE, '000-000-000', 'johnsmith128@email.com', '2025-06-17', '2025-06-18', 5, 'Single', TRUE, FALSE, TRUE, FALSE, 230.0),
    ('Alexander Williamson Smith', '1985-07-15', FALSE, '000-000-000', 'johnsmith132@email.com', '2025-01-15', '2025-01-16', 1, 'Double', TRUE, TRUE, TRUE, TRUE, 230.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1985-07-15', TRUE, '000-000-000', 'johnsmith15k@email.com', '2026-01-15', '2026-01-16', 5, 'Single', TRUE, FALSE, FALSE, FALSE, 230.0),
    ('Leo', '2025-01-15', TRUE, '000-000-000', 'johnsmith1k6@email.com', '2025-01-15', '2025-01-16', 3, 'Single', TRUE, TRUE, TRUE, TRUE, 230.0),
    ('Alexander Williamson Smith', '2025-01-15', FALSE, '000-000-000', 'johnsmith127@email.com', '2025-06-17', '2025-01-16', 3, 'Single', TRUE, FALSE, TRUE, FALSE, 230.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '2025-01-15', TRUE, '000-000-000', 'johnsmith12g@email.com', '2025-01-15', '2025-01-16', 5, 'Single', FALSE, TRUE, FALSE, FALSE, 1000.0),
    ('Leo', '1900-01-01', FALSE, '000-000-000', 'longemailaddress987@email.com', '2025-01-15', '2025-01-16', 3, 'Double', TRUE, FALSE, FALSE, FALSE, 1000.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '1900-01-01', FALSE, '000-000-000', 'longemailaddress165@email.com', '2025-06-17', '2026-01-16', 3, 'Suite', TRUE, TRUE, TRUE, TRUE, 27940.0),
    ('Leo', '2025-01-15', TRUE, '000-000-000', 'longemailaddress191@email.com', '2026-01-15', '2026-01-16', 3, 'Suite', FALSE, FALSE, FALSE, TRUE, 280.0),
    ('Alexander Williamson Smith', '2025-01-15', FALSE, '000-000-000', 'longemailaddress141@email.com', '2026-01-15', '2026-01-16', 5, 'Double', TRUE, TRUE, TRUE, TRUE, 380.0),
    ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Doe', '2025-01-15', FALSE, '000-000-000', 'longemailaddress155@email.com', '2025-06-17', '2025-06-18', 5, 'Suite', FALSE, FALSE, FALSE, TRUE, 280.0),
    ('Alexander Williamson Smith', '1900-01-01', TRUE, '000-000-000', 'longemailaddress176@email.com', '2025-06-17', '2025-01-16', 3, 'Single', TRUE, FALSE, FALSE, TRUE, 1000.0);



INSERT INTO user_booking (full_name, date_of_birth, gender, phone_number, email, check_in_date, check_out_date, num_of_guests, room_type, breakfast_included, smoking_preference, accessibility_features_required, extra_bed_needed, room_id, total_price)
VALUES
    ('John Doe', '1985-08-15', TRUE, '123-456-7890', 'john.doe@example.com', '2025-06-01', '2025-06-05', 2, 'SINGLE', FALSE, FALSE, FALSE, FALSE, 12, 1240.0),
    ('Jane Smith', '1990-04-20', FALSE, '234-567-8901', 'jane.smith@example.com', '2025-07-10', '2025-07-12', 3, 'DOUBLE', TRUE, TRUE, TRUE, FALSE, 21, 1472.0),
    ('Alice Johnson', '1995-12-05', TRUE, '345-678-9012', 'alice.johnson@example.com',  '2025-08-15', '2025-08-20', 1, 'SUITE', TRUE, FALSE, TRUE, TRUE, 23, 523.0),
    ('Bob Brown', '1988-06-30', TRUE, '456-789-0123', 'bob.brown@example.com', '2025-09-01', '2025-09-03', 2, 'SINGLE', FALSE, FALSE, FALSE, TRUE, 10, 1000.0),
    ('Emily White', '1992-02-14', FALSE, '567-890-1234', 'emily.white@example.com', '2025-10-10', '2025-10-12', 4, 'DOUBLE', TRUE, FALSE, FALSE, FALSE, 14, 125.0);

