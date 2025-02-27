INSERT INTO role (name) VALUES
                                         ('ADMIN'),
                                         ('USER');

INSERT INTO users (name, surname, email, password, phone, birthday, role_id) VALUES
                                                                       ('John', 'Doe', 'johndoe@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-456-7890-74', '1980-01-15', 2),
                                                                      ('Jane', 'Smith', 'janesmith@yahoo.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-321-6540-87', '1985-03-22', 2),
                                                                       ('Robert', 'Johnson', 'robertj@hotmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-555-7890-12', '1978-07-14', 2),
                                                                       ('Emily', 'Davis', 'emilyd@aol.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-456-1237-90', '1990-05-10', 2),
                                                                       ('Michael', 'Brown', 'michaelb@protonmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-789-4562-30', '1982-02-28',2),
                                                                       ('Jessica', 'Taylor', 'jtaylor@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-987-6543-20', '1995-09-13',2),
                                                                       ('William', 'Anderson', 'william.anderson@company.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-876-4321-09', '1988-11-01',2),
                                                                      ('Olivia', 'Harris', 'olivia.harris@yahoo.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-654-3219-76', '1992-12-30',2),
                                                                      ('David', 'Martinez', 'david.martinez@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-543-2109-76', '1986-04-08',2),
                                                                       ('Sophia', 'Lee', 'sophia.lee@outlook.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-432-1098-65', '1989-06-21',2),
                                                                        ('James', 'Wilson', 'jameswilson@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+380-321-0987-54', '1984-08-14',2),
                                                                        ('Emma', 'Clark', 'emma.clark@hotmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-234-5678-01', '1993-10-17',2),
                                                                       ('Alexander', 'Hall', 'alex.hall@workmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-111-2223-33', '1975-07-19',2),
                                                                       ('Isabella', 'Young', 'isabella.young@yahoo.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-999-8887-77', '1981-03-05', 1),
                                                                      ('Benjamin', 'King', 'ben.king@gmail.com', '$2a$12$QBvol8xoQ3DXCo6YNE5VNOhP9135YkKSIryy096zk3AXd6h/dDel.', '+420-888-7776-66', '1983-01-12',1);

-- Insert countries
INSERT INTO countries (country) VALUES
                                    ('Germany'),
                                    ('France'),
                                    ('Italy'),
                                    ('Spain'),
                                    ('Netherlands');

-- Insert cities
INSERT INTO cities (city, country_id) VALUES
('Berlin', 1),
('Munich', 1),
('Paris', 2),
('Lyon', 2),
('Rome', 3),
('Milan', 3),
('Madrid', 4),
('Barcelona', 4),
('Amsterdam', 5),
('Rotterdam', 5);


INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Berlin Grand Hotel', '1 Alexanderplatz, Berlin', 1, '+(49)-123-111-001', 'info@berlingrandhotel.com', 'https://www.berlingrandhotel.com', 4.5),
                                                                               ('Hotel Berlin Mitte', '10 Friedrichstrasse, Berlin', 1, '+(49)-123-111-002', 'contact@hotelberlinmitte.com', 'https://www.hotelberlinmitte.com', 4.3),
                                                                               ('Berlin Plaza Hotel', '50 Kurfürstendamm, Berlin', 1, '+(49)-123-111-003', 'stay@berlinplaza.com', 'https://www.berlinplaza.com', 2.0),
                                                                               ('Central Berlin Stay', '5 Potsdamer Platz, Berlin', 1, '+(49)-123-111-004', 'reservations@centralberlinstay.com', NULL, 4.1);
INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Munich Palace Hotel', '20 Leopoldstrasse, Munich', 2, '+(49)-124-222-001', 'info@munichpalace.com', 'https://www.munichpalace.com', 4.6),
                                                                               ('Bavarian Inn', '15 Marienplatz, Munich', 2, '+(49)-124-222-002', 'stay@bavarianinn.com', 'https://www.bavarianinn.com', 3.4),
                                                                               ('Hotel Munich City', '100 Theresienhöhe, Munich', 2, '+(49)-124-222-003', 'contact@hotelmunichcity.com', 'https://www.hotelmunichcity.com', 4.2),
                                                                               ('Munich Central Hotel', '30 Bahnhofplatz, Munich', 2, '+(49)-124-222-004', 'reservations@munichcentralhotel.com', NULL, 4.3);
INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Paris Elegance Hotel', '10 Rue de Rivoli, Paris', 3, '+(33)-125-333-001', 'info@pariselegance.com', 'https://www.pariselegance.com', 2.7),
                                                                               ('Hotel Parisian Chic', '25 Avenue des Champs-Élysées, Paris', 3, '+(33)-125-333-002', 'contact@parisianchic.com', 'https://www.parisianchic.com', 4.5),
                                                                               ('The Paris Grand', '5 Boulevard Haussmann, Paris', 3, '+(33)-125-333-003', 'stay@parisgrand.com', 'https://www.parisgrand.com', 3.4),
                                                                               ('Central Paris Hotel', '12 Place de la Concorde, Paris', 3, '+(33)-125-333-004', 'reservations@centralparishotel.com', NULL, 4.6);
INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Lyon Heritage Hotel', '30 Rue de la République, Lyon', 4, '+(33)-126-444-001', 'info@lyonheritage.com', 'https://www.lyonheritage.com', 4.5),
                                                                               ('Hotel Lyon Central', '5 Place Bellecour, Lyon', 4, '+(33)-126-444-002', 'contact@lyoncentral.com', 'https://www.lyoncentral.com', 3.4),
                                                                               ('The Lyon Grand', '12 Rue des Marronniers, Lyon', 4, '+(33)-126-444-003', 'stay@lyongrand.com', 'https://www.lyongrand.com', 3.3),
                                                                               ('Central Lyon Stay', '20 Quai Saint-Antoine, Lyon', 4, '+(33)-126-444-004', 'reservations@centrallyonstay.com', NULL, 4.2);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Rome Imperial Hotel', '1 Piazza Venezia, Rome', 5, '+(39)-128-666-001', 'info@romeimperial.com', 'https://www.romeimperial.com', 3.7),
                                                                               ('Hotel Roman Elegance', '10 Via Veneto, Rome', 5, '+(39)-128-666-002', 'contact@romanElegance.com', 'https://www.romanelegance.com', 4.6),
                                                                               ('The Eternal Stay', '5 Piazza Navona, Rome', 5, '+(39)-128-666-003', 'stay@eternalstay.com', 'https://www.eternalstay.com', 4.5),
                                                                               ('Rome Heritage Hotel', '15 Via del Corso, Rome', 5, '+(39)-128-666-004', 'reservations@romeheritage.com', NULL, 4.6);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Milan Grand Hotel', '20 Corso Buenos Aires, Milan', 6, '+(39)-129-777-001', 'info@milangrand.com', 'https://www.milangrand.com', 4.8),
                                                                               ('Hotel Milano Centrale', '30 Piazza Duca Aosta Milan', 6, '+(39)-129-777-002', 'contact@milanocentrale.com', 'https://www.milanocentrale.com', 3.6),
                                                                               ('Milano Luxury Stay', '10 Via Montenapoleone, Milan', 6, '+(39)-129-777-003', 'stay@milanoluxurystay.com', 'https://www.milanoluxurystay.com', 4.7),
                                                                               ('Hotel Milan Elite', '5 Piazza Gae Aulenti, Milan', 6, '+(39)-129-777-004', 'reservations@milanelite.com', NULL, 4.6);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
                                                                               ('Madrid Royal Stay', '10 Gran Via, Madrid', 7, '+(34)-130-888-001', 'info@madridroyalstay.com', 'https://www.madridroyalstay.com', 3.7),
                                                                               ('Hotel Madrid Center', '15 Puerta del Sol, Madrid', 7, '+(34)-130-888-002', 'contact@madridcenter.com', 'https://www.madridcenter.com', 4.6),
                                                                               ('The Madrid Palace', '20 Plaza Mayor, Madrid', 7, '+(34)-130-888-003', 'stay@madridpalace.com', 'https://www.madridpalace.com', 2.8),
                                                                               ('Elite Madrid Hotel', '5 Calle de Alcala, Madrid', 7, '+(34)-130-888-004', 'reservations@elitemadrid.com', NULL, 4.5);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
('Barcelona Grand Hotel', '1 La Rambla, Barcelona', 8, '+(34)-131-999-001', 'info@barcelonagrand.com', 'https://www.barcelonagrand.com', 4.8),
('Hotel Catalonia Chic', '20 Passeig de Gracia, Barcelona', 8, '+(34)-131-999-002', 'contact@cataloniachic.com', 'https://www.cataloniachic.com', 4.7),
('The Barcelona Palace', '10 Plaza Catalunya, Barcelona', 8, '+(34)-131-999-003', 'stay@barcelonapalace.com', 'https://www.barcelonapalace.com', 2.6),
('Central Barcelona Stay', '5 Barceloneta Beach, Barcelona', 8, '+(34)-131-999-004', 'reservations@centralbarcelonastay.com', NULL, 3.5);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
('Amsterdam Royal Inn', '1 Dam Square, Amsterdam', 9, '+(31)-132-000-001', 'info@amsterdamroyal.com', 'https://www.amsterdamroyal.com', 3.7),
('Hotel Amsterdam Center', '10 Leidseplein, Amsterdam', 9, '+(31)-132-000-002', 'contact@amsterdamcenter.com', 'https://www.amsterdamcenter.com', 4.6),
('The Amsterdam Grand', '20 Vondelpark, Amsterdam', 9, '+(31)-132-000-003', 'stay@amsterdamgrand.com', 'https://www.amsterdamgrand.com', 4.8),
('Central Amsterdam Stay', '5 Prinsengracht, Amsterdam', 9, '+(31)-132-000-004', 'reservations@centralamsterdamstay.com', NULL, 4.6);

INSERT INTO hotels (name, address, city_id, phone, email, website, rating) VALUES
('Rotterdam Palace Hotel', '1 Euromast Boulevard, Rotterdam', 10, '+(31)-133-111-001', 'info@rotterdampalace.com', 'https://www.rotterdampalace.com', 3.6),
('Hotel Rotterdam Center', '10 Erasmus Bridge, Rotterdam', 10, '+(31)-133-111-002', 'contact@rotterdamcenter.com', 'https://www.rotterdamcenter.com', 4.5),
('The Rotterdam Elite', '20 Market Hall, Rotterdam', 10, '+(31)-133-111-003', 'stay@rotterdamelite.com', 'https://www.rotterdamelite.com', 2.7),
('Central Rotterdam Stay', '5 Cube Houses, Rotterdam', 10, '+(31)-133-111-004', 'reservations@centralrotterdamstay.com', NULL, 4.4);


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (1, 'Executive Room', 'WiFi, AC, TV, Work Desk', 130.00, 2, 'Executive'),
                                                                                         (1, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         (1, 'Suite Room', 'WiFi, AC, TV, Minibar, Balcony', 220.00, 4, 'Suite'),
                                                                                         (1, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 140.00, 3, 'Deluxe');

-- Berlin Plaza Hotel Rooms
INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (2, 'Economy Room', 'WiFi, AC', 70.00, 2, 'Economy'),
                                                                                         (2, 'Standard Room', 'WiFi, AC, TV', 85.00, 2, 'Standard'),
                                                                                         (2, 'Family Room', 'WiFi, AC, TV, Extra Bed', 110.00, 4, 'Family'),
                                                                                         (2, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 130.00, 3, 'Deluxe');

-- Central Berlin Stay Rooms
INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (3, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         (3, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 250.00, 5, 'Suite'),
                                                                                         (3, 'Family Room', 'WiFi, AC, TV, Minibar, Extra Bed', 170.00, 4, 'Family'),
                                                                                         (3, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 150.00, 3, 'Deluxe');

INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (4, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 160.00, 2, 'Deluxe'),
                                                                                         (4, 'Suite Room', 'WiFi, AC, TV, Minibar, Balcony', 250.00, 4, 'Suite');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (5, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         (5, 'Economy Room', 'WiFi, AC', 75.00, 2, 'Economy');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (6, 'Executive Room', 'WiFi, AC, TV, Work Desk', 130.00, 2, 'Executive'),
                                                                                         (6, 'Standard Room', 'WiFi, AC, TV', 100.00, 2, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (7, 'Family Room', 'WiFi, AC, TV, Extra Bed', 160.00, 4, 'Family'),
                                                                                         (7, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (8, 'Economy Room', 'WiFi, AC', 70.00, 2, 'Economy'),
                                                                                         (8, 'Standard Room', 'WiFi, AC, TV', 85.00, 2, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (9, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 250.00, 4, 'Suite'),
                                                                                         (9, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (10, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard'),
                                                                                         (10, 'Family Room', 'WiFi, AC, TV, Extra Bed', 140.00, 4, 'Family');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (11, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 200.00, 3, 'Deluxe');

INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                  (1, 'Standard Room', 'WiFi, AC', 90.00, 4, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (12, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 150.00, 2, 'Deluxe'),
                                                                                         (12, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 220.00, 4, 'Suite');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (13, 'Standard Room', 'WiFi, AC, TV', 100.00, 2, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (14, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 170.00, 3, 'Deluxe'),
                                                                                         (14, 'Executive Room', 'WiFi, AC, TV, Work Desk', 190.00, 2, 'Executive');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (15, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 220.00, 2, 'Deluxe');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (16, 'Standard Room', 'WiFi, AC, TV', 110.00, 2, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (17, 'Suite Room', 'WiFi, AC, TV, Minibar, Balcony', 250.00, 4, 'Suite'),
                                                                                         (17, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (18, 'Executive Room', 'WiFi, AC, TV, Work Desk', 160.00, 2, 'Executive');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (19, 'Standard Room', 'WiFi, AC, TV', 85.00, 2, 'Standard');


INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (20, 'Deluxe Room', 'WiFi, AC, TV, Minibar', 180.00, 3, 'Deluxe');

INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
                                                                                         (21, 'Economy Room', 'WiFi, AC', 70.00, 2, 'Economy'),
                                                                                         (21, 'Standard Room', 'WiFi, AC, TV', 90.00, 2, 'Standard');

INSERT INTO rooms (hotel_id, name, facilities, price_per_night, capacity, room_type) VALUES
    (22, 'Suite Room', 'WiFi, AC, TV, Minibar, Living Room', 240.00, 4, 'Suite');


INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price) VALUES
                                                                              (1, 1, '2024-10-01', '2024-10-05', 480.00),
                                                                              (2, 3, '2024-10-10', '2024-10-15', 1750.00),
                                                                              (3, 2, '2024-10-15', '2024-10-20', 1100.00),
                                                                              (4, 4, '2024-11-01', '2024-11-07', 3000.00),
                                                                              (5, 5, '2024-11-10', '2024-11-15', 2000.00),
                                                                              (6, 6, '2024-12-01', '2024-12-07', 1200.00),
                                                                              (7, 7, '2024-12-10', '2024-12-20', 900.00),
                                                                              (8, 8, '2025-01-05', '2025-01-10', 2250.00),
                                                                              (9, 9, '2025-02-01', '2025-02-07', 3600.00),
                                                                              (10, 10, '2025-03-01', '2025-03-07', 4200.00),
                                                                              (11, 11, '2025-03-15', '2025-03-20', 1300.00),
                                                                              (12, 12, '2025-04-01', '2025-04-05', 1600.00),
                                                                              (13, 13, '2025-04-10', '2025-04-17', 2500.00),
                                                                              (14, 14, '2025-04-20', '2025-04-25', 2750.00),
                                                                              (15, 15, '2025-05-01', '2025-05-05', 2300.00),
                                                                              (1, 16, '2025-05-10', '2025-05-15', 1400.00),
                                                                              (2, 17, '2025-06-01', '2025-06-05', 1050.00),
                                                                              (3, 18, '2025-06-10', '2025-06-15', 1950.00),
                                                                              (4, 19, '2025-06-20', '2025-06-25', 2800.00),
                                                                              (5, 20, '2025-07-01', '2025-07-07', 2200.00),
                                                                              (6, 21, '2025-07-10', '2025-07-15', 1450.00),
                                                                              (7, 22, '2025-07-20', '2025-07-25', 2050.00),
                                                                              (8, 23, '2025-08-01', '2025-08-05', 3450.00),
                                                                              (9, 24, '2025-08-10', '2025-08-17', 5000.00),
                                                                              (10, 25, '2025-09-01', '2025-09-07', 2100.00),
                                                                              (11, 26, '2025-09-10', '2025-09-15', 1600.00),
                                                                              (12, 27, '2025-10-01', '2025-10-07', 3000.00),
                                                                              (13, 28, '2025-10-10', '2025-10-15', 1800.00),
                                                                              (14, 29, '2025-10-20', '2025-10-25', 1700.00),
                                                                              (15, 30, '2025-11-01', '2025-11-05', 2700.00),
                                                                              (1, 31, '2025-11-10', '2025-11-15', 2000.00),
                                                                              (2, 32, '2025-12-01', '2025-12-07', 4000.00),
                                                                              (3, 33, '2025-12-10', '2025-12-20', 3500.00),
                                                                              (4, 34, '2025-12-25', '2025-12-30', 1450.00);




INSERT INTO user_booking (full_name, date_of_birth, gender, phone_number, email, check_in_date, check_out_date, num_of_guests, room_type, breakfast_included, smoking_preference, accessibility_features_required, extra_bed_needed, room_id, total_price)
VALUES
    ('John Doe', '1985-08-15', TRUE, '123-456-7890', 'john.doe@example.com', '2025-06-01', '2025-06-05', 2, 'Single', FALSE, FALSE, FALSE, FALSE, 12, 1240.0),
    ('Jane Smith', '1990-04-20', FALSE, '234-567-8901', 'jane.smith@example.com', '2025-07-10', '2025-07-12', 3, 'Double', TRUE, TRUE, TRUE, FALSE, 21, 1472.0),
    ('Alice Johnson', '1995-12-05', TRUE, '345-678-9012', 'alice.johnson@example.com',  '2025-08-15', '2025-08-20', 1, 'Suite', TRUE, FALSE, TRUE, TRUE, 23, 523.0),
    ('Bob Brown', '1988-06-30', TRUE, '456-789-0123', 'bob.brown@example.com', '2025-09-01', '2025-09-03', 2, 'Single', FALSE, FALSE, FALSE, TRUE, 10, 1000.0),
    ('Emily White', '1992-02-14', FALSE, '567-890-1234', 'emily.white@example.com', '2025-10-10', '2025-10-12', 4, 'Double', TRUE, FALSE, FALSE, FALSE, 14, 125.0);


