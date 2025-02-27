package com.example.main_management.controller;

import com.example.main_management.dto.BookInfoDto;
import com.example.main_management.entity.Booking;
import com.example.main_management.repository.BookingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BookingRepository bookingRepository;

    private Long lastInsertedBookingId;

    @Test
    void testCreateBooking_Success() throws JsonProcessingException {

        BookInfoDto userBooking = new BookInfoDto();
        userBooking.setName("John Doe");
        userBooking.setEmail("john.doe@example.com");
        userBooking.setDateOfBirth("2001-06-17");
        userBooking.setMale(true);
        userBooking.setPhone("+420-01-12-1111");
        userBooking.setEmail("mysupermaim@email.com");
        userBooking.setCheckInDate("01-08-2025");
        userBooking.setCheckOutDate("05-08-2025");
        userBooking.setGuests("2");
        userBooking.setRoomType("Double");
        userBooking.setBreakfastIncluded(false);
        userBooking.setSmoking(false);
        userBooking.setAccessibility(false);
        userBooking.setExtraBed(false);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()));

        HttpEntity<BookInfoDto> entity = new HttpEntity<>(userBooking, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "/api/booking/1/5/2025-08-01/2025-08-05",
                HttpMethod.POST,
                entity,
                String.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        assertEquals("John Doe", jsonNode.get("fullName").asText());

        Booking lastBooking = bookingRepository.findTopByOrderByIdDesc().orElse(null);
        assertNotNull(lastBooking);

        lastInsertedBookingId = lastBooking.getId();

        if (lastInsertedBookingId != null) {
            bookingRepository.deleteById(lastInsertedBookingId);
            lastInsertedBookingId = null;
        }
    }

    @Test
    void testCreateBooking_Conflic() throws JsonProcessingException {

        BookInfoDto userBooking = new BookInfoDto();
        userBooking.setName("John Doe");
        userBooking.setEmail("john.doe@example.com");
        userBooking.setDateOfBirth("2001-06-17");
        userBooking.setMale(true);
        userBooking.setPhone("+420-01-12-1111");
        userBooking.setEmail("mysupermaim@email.com");
        userBooking.setCheckInDate("10-12-2025");
        userBooking.setCheckOutDate("20-12-2025");
        userBooking.setGuests("2");
        userBooking.setRoomType("Double");
        userBooking.setBreakfastIncluded(false);
        userBooking.setSmoking(false);
        userBooking.setAccessibility(false);
        userBooking.setExtraBed(false);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()));

        HttpEntity<BookInfoDto> entity = new HttpEntity<>(userBooking, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "/api/booking/1/15/2025-12-10/2025-12-20",
                HttpMethod.POST,
                entity,
                String.class
        );
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }



    @Test
    void testCreateBooking_BadRequest() throws JsonProcessingException {

        BookInfoDto userBooking = new BookInfoDto();
        userBooking.setName("John Doe");
        userBooking.setEmail("john.doe@example.com");
        userBooking.setDateOfBirth("2001-06-17");
        userBooking.setMale(true);
        userBooking.setPhone("+420-01-12-1111");
        userBooking.setEmail("mysupermaim@email.com");
        userBooking.setCheckInDate("28-01-2025");
        userBooking.setCheckOutDate("05-02-2025");
        userBooking.setGuests("2");
        userBooking.setRoomType("Double");
        userBooking.setBreakfastIncluded(false);
        userBooking.setSmoking(false);
        userBooking.setAccessibility(false);
        userBooking.setExtraBed(false);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()));

        HttpEntity<BookInfoDto> entity = new HttpEntity<>(userBooking, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "/api/booking/1/5/2025-01-58/2025-02-05",
                HttpMethod.POST,
                entity,
                String.class
        );

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        Booking lastBooking = bookingRepository.findTopByOrderByIdDesc().orElse(null);
        assertNotNull(lastBooking);

        lastInsertedBookingId = lastBooking.getId();

        if (lastInsertedBookingId != null) {
            bookingRepository.deleteById(lastInsertedBookingId);
            lastInsertedBookingId = null;
        }
    }


    @Test
    void testGetAllBookings_ShouldReturnBookings() throws Exception {
        mockMvc.perform(get("/api/booking/view")
                        .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    void testGetPastBookings_ShouldReturnPastBookings() throws Exception {
        mockMvc.perform(get("/api/booking/view-past")
                        .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testGetUpcomingBookings_ShouldReturnUpcomingBookings() throws Exception {
        mockMvc.perform(get("/api/booking/view-upcoming")
                        .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetCurrentBookings_ShouldReturnEmpty() throws Exception {
        mockMvc.perform(get("/api/booking/view-current")
                        .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("johndoe@gmail.com:12345".getBytes()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }











}