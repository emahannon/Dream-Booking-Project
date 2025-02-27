package com.example.main_management.repository;

import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.entity.Booking;
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
class BookingRepositoryTest {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    void findBookingsByRoomAndDatesFree() {
        LocalDate requestedCheckIn = LocalDate.of(2025, 12, 22);
        LocalDate requestedCheckOut = LocalDate.of(2025, 12, 24);
        List<Booking> bookingList = bookingRepository.findBookingsByRoomAndDates(1L, requestedCheckIn, requestedCheckOut);
        assertTrue(bookingList.isEmpty());

    }


    @Test
    void findBookingsByRoomAndDatesNotFree() {
        LocalDate requestedCheckIn = LocalDate.of(2024, 10, 5);
        LocalDate requestedCheckOut = LocalDate.of(2024, 10, 15);
        List<Booking> bookingList = bookingRepository.findBookingsByRoomAndDates(1L, requestedCheckIn, requestedCheckOut);
        assertFalse(bookingList.isEmpty());
        assertEquals(1, bookingList.size());
        assertEquals(480.00, bookingList.get(0).getTotal_price());
        assertEquals(1L, bookingList.get(0).getRoom().getId());

    }

    @Test
    void findBookingDetailsByUserId() {
        List<BookingDetailsDto> bookingDetailsDtos = bookingRepository.findBookingDetailsByUserId(1L);
        assertFalse(bookingDetailsDtos.isEmpty());
        assertEquals(3, bookingDetailsDtos.size());

    }
}