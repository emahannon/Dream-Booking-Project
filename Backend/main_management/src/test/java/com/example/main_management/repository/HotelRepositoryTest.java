package com.example.main_management.repository;

import com.example.main_management.entity.Hotel;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class HotelRepositoryTest {

    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    void findAvailableHotels() {
        LocalDate checkInDate = LocalDate.of(2025, 1, 20);
        LocalDate checkOutDate = LocalDate.of(2025, 1, 21);
        List<Hotel> availableHotels = hotelRepository.findAvailableHotels(3L, checkInDate, checkOutDate);

        assertNotNull(availableHotels);
        assertEquals(4, availableHotels.size());
        assertTrue(availableHotels.contains(hotelRepository.findById(9L).get()));
        assertTrue(availableHotels.contains(hotelRepository.findById(10L).get()));
        assertTrue(availableHotels.contains(hotelRepository.findById(11L).get()));
        assertTrue(availableHotels.contains(hotelRepository.findById(12L).get()));

    }

    @Test
    void findHotelById() {
        Hotel hotel = hotelRepository.findHotelById(9L);

        assertNotNull(hotel);
        assertEquals("info@pariselegance.com", hotel.getEmail());
        assertEquals("+(33)-125-333-001", hotel.getPhone());

    }

    @Test
    void findHotelByIdNull() {
        Hotel hotel = hotelRepository.findHotelById(9999L);
        assertNull(hotel);

    }
}