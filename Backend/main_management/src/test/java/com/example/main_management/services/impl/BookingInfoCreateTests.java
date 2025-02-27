package com.example.main_management.services.impl;


import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.enams.RoomType;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.services.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BookingInfoCreateTests {

    @Autowired
    private BookingService bookingService;


    private static Stream<Arguments> provideTestData(@Autowired JdbcTemplate jdbcTemplate) {
        List<Object[]> testData = jdbcTemplate.query("SELECT full_name, date_of_birth, gender, phone_number, email, check_in_date, check_out_date, num_of_guests, room_type, breakfast_included, smoking_preference, accessibility_features_required, extra_bed_needed, total_price FROM user_booking_test_data",
                (rs, rowNum) -> new Object[] {
                        rs.getString("full_name"),
                        rs.getString("date_of_birth"),
                        rs.getBoolean("gender"),
                        rs.getString("phone_number"),
                        rs.getString("email"),
                        rs.getString("check_in_date"),
                        rs.getString("check_out_date"),
                        rs.getInt("num_of_guests"),
                        rs.getString("room_type"),
                        rs.getBoolean("breakfast_included"),
                        rs.getBoolean("smoking_preference"),
                        rs.getBoolean("accessibility_features_required"),
                        rs.getBoolean("extra_bed_needed"),
                        rs.getDouble("total_price")
                });
        return testData.stream().map(Arguments::of);
    }

    @ParameterizedTest
    @MethodSource("provideTestData")
    public void testCreateBookingInfo(Object fullName, String dateOfBirth, Boolean gender, String phoneNumber, String email,
                                      String checkInDate, String checkOutDate, Integer numOfGuests, String roomType,
                                      Boolean breakfastIncluded, Boolean smokingPreference, Boolean accessibilityFeaturesRequired,
                                      Boolean extraBedNeeded, Double totalPrice) {


        BookInfo bookInfo = new BookInfo();
        bookInfo.setFullName((String) fullName);
        bookInfo.setDateOfBirth(LocalDate.parse(dateOfBirth));
        bookInfo.setGender(gender);
        bookInfo.setPhoneNumber(phoneNumber);
        bookInfo.setEmail(email);
        bookInfo.setCheckInDate(LocalDate.parse(checkInDate));
        bookInfo.setCheckOutDate(LocalDate.parse(checkOutDate));
        bookInfo.setNumOfGuests(numOfGuests);
        bookInfo.setRoomType(RoomType.valueOf(roomType.toUpperCase()));
        bookInfo.setBreakfastIncluded(breakfastIncluded);
        bookInfo.setSmokingPreference(smokingPreference);
        bookInfo.setAccessibilityFeaturesRequired(accessibilityFeaturesRequired);
        bookInfo.setExtraBedNeeded(extraBedNeeded);

        LocalDate today = LocalDate.now();
        LocalDate maxDateOfBirth = today.minusYears(150);

                boolean age = bookInfo.getDateOfBirth().isAfter(today) || bookInfo.getDateOfBirth().isBefore(maxDateOfBirth) || bookInfo.getDateOfBirth().equals(today);
        boolean checkInBool = bookInfo.getCheckInDate().isBefore(today);
        boolean checkOutBool = !bookInfo.getCheckOutDate().isAfter(bookInfo.getCheckInDate());

        if (age || checkInBool|| checkOutBool) {
            assertThrows(IllegalArgumentException.class, () -> {
                bookingService.createBookingInfo(bookInfo, 1L);
            });
        } else {

            BookInfo createdBookInfo = bookingService.createBookingInfo(bookInfo, 1L);

            assertNotNull(createdBookInfo);
            assertEquals(totalPrice, createdBookInfo.getTotalPrice(), 0.01);

        }


    }

    @Test
    public void testCreateBookingInfo_WithInvalidId_ThrowsNullEntityReferenceException() {

        BookInfo bookInfo = new BookInfo();
        bookInfo.setFullName("John Doe");
        bookInfo.setDateOfBirth(LocalDate.parse("1990-01-01"));
        bookInfo.setGender(true);
        bookInfo.setPhoneNumber("123456789");
        bookInfo.setEmail("johndoe@example.com");
        bookInfo.setCheckInDate(LocalDate.parse("2025-01-26"));
        bookInfo.setCheckOutDate(LocalDate.parse("2025-01-30"));
        bookInfo.setNumOfGuests(2);
        bookInfo.setRoomType(RoomType.SINGLE);
        bookInfo.setBreakfastIncluded(true);
        bookInfo.setSmokingPreference(false);
        bookInfo.setAccessibilityFeaturesRequired(true);
        bookInfo.setExtraBedNeeded(false);

        assertThrows(NullEntityReferenceException.class, () -> {
            bookingService.createBookingInfo(bookInfo, 999L);
        });
    }


    @Test
    public void testDateOfBirth_InTheFuture_ThrowsException() {

        LocalDate futureDateOfBirth = LocalDate.now().plusDays(1);
        BookInfo bookInfo = new BookInfo();
        bookInfo.setDateOfBirth(futureDateOfBirth);
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBookingInfo(bookInfo, 1L);
        });
    }



    @Test
    public void testDateOfBirth_Today_ThrowsException() {

        LocalDate today = LocalDate.now();
        BookInfo bookInfo = new BookInfo();
        bookInfo.setDateOfBirth(today);

        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBookingInfo(bookInfo, 1L);
        });
    }
}


