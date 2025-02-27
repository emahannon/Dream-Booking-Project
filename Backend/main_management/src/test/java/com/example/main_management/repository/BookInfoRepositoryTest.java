package com.example.main_management.repository;

import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.enams.RoomType;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BookInfoRepositoryTest {

    @Autowired
    private BookInfoRepository userBookingRepository;

    @Autowired
    private Flyway flyway;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @ParameterizedTest
    @MethodSource("provideTestData")
    public void testInsertUserBooking(String fullName, String dob, boolean gender, String phoneNumber, String email, String checkInDate, String checkOutDate, int numOfGuests, String roomType, boolean breakfastIncluded, boolean smokingPreference, boolean accessibilityFeaturesRequired, boolean extraBedNeeded, Double totalPrice) {

        BookInfo userBooking = new BookInfo();
        userBooking.setFullName(fullName);
        userBooking.setDateOfBirth(LocalDate.parse(dob));
        userBooking.setGender(gender);
        userBooking.setPhoneNumber(phoneNumber);
        userBooking.setEmail(email);
        userBooking.setCheckInDate(LocalDate.parse(checkInDate));
        userBooking.setCheckOutDate(LocalDate.parse(checkOutDate));
        userBooking.setNumOfGuests(numOfGuests);
        userBooking.setRoomType(RoomType.valueOf(roomType.toUpperCase()));
        userBooking.setBreakfastIncluded(breakfastIncluded);
        userBooking.setSmokingPreference(smokingPreference);
        userBooking.setAccessibilityFeaturesRequired(accessibilityFeaturesRequired);
        userBooking.setExtraBedNeeded(extraBedNeeded);
        userBooking.setTotalPrice(totalPrice);


        userBookingRepository.save(userBooking);

        BookInfo savedBooking = userBookingRepository.findBookInfoByEmail(email);
        assertNotNull(savedBooking);
        assertEquals(fullName, savedBooking.getFullName());
        assertEquals(dob, savedBooking.getDateOfBirth().toString());
        assertEquals(gender, savedBooking.getGender());
        assertEquals(phoneNumber, savedBooking.getPhoneNumber());
        assertEquals(checkInDate, savedBooking.getCheckInDate().toString());
        assertEquals(checkOutDate, savedBooking.getCheckOutDate().toString());
        assertEquals(numOfGuests, savedBooking.getNumOfGuests());
        assertEquals(roomType.toUpperCase(), savedBooking.getRoomType().toString());
        assertEquals(breakfastIncluded, savedBooking.getBreakfastIncluded());
        assertEquals(smokingPreference, savedBooking.getSmokingPreference());
        assertEquals(accessibilityFeaturesRequired, savedBooking.getAccessibilityFeaturesRequired());
        assertEquals(extraBedNeeded, savedBooking.getExtraBedNeeded());
    }


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


    @Test
    void findBookInfoByEmail_ShouldReturnBookInfo_WhenEmailExists() {

        BookInfo result = userBookingRepository.findBookInfoByEmail("john.doe@example.com");

        assertNotNull(result, "Expected BookInfo to be present.");
        assertEquals("john.doe@example.com", result.getEmail(), "Email should match.");
        assertEquals("John Doe", result.getFullName(), "Full name should match.");
    }
}
