package com.example.main_management.controller;

import com.example.main_management.dto.HotelDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;


import static org.junit.matchers.JUnitMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SearchControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    @Test
    public void testSearchHotels_Success() throws Exception {
        mockMvc.perform(get("/api/main/search")
                        .param("city", "Berlin")
                        .param("checkInDate", "2025-06-01")
                        .param("checkOutDate", "2025-06-05")
                        .param("minPrice", "300")
                        .param("maxPrice", "1000")
                        .param("minRating", "3")
                        .param("maxGuests", "2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Berlin Grand Hotel"))
                .andExpect(jsonPath("$[1].name").value("Central Berlin Stay"));
    }


    @Test
    public void testSearchHotels_InvalidParams() throws Exception {
        mockMvc.perform(get("/api/main/search")
                        .param("city", "")
                        .param("checkInDate", "2025-06-01")
                        .param("checkOutDate", "2025-06-05")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }


    @Test
    void testSearchHotels_CheckInDateInPast_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/main/search")
                        .param("city", "Berlin")
                        .param("checkInDate", LocalDate.now().minusDays(1).toString())
                        .param("checkOutDate", LocalDate.now().plusDays(3).toString()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Check-in date cannot be in the past")));
    }


    @Test
    void testSearchHotels_CheckOutBeforeCheckIn_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/main/search")
                        .param("city", "Berlin")
                        .param("checkInDate", LocalDate.now().plusDays(5).toString())
                        .param("checkOutDate", LocalDate.now().plusDays(4).toString()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Check-out date must be after the check-in date.")));
    }


    @Test
    public void testGetHotelInformation() {
        ResponseEntity<HotelDto> response = restTemplate.getForEntity("http://localhost:" + port + "/api/main/hotel_info/1", HotelDto.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Berlin Grand Hotel", response.getBody().getName());
    }


    @Test
    void testGetHotelInformation_NullHotelId_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/main/hotel_info/999"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Hotel with id 999 not found")));
    }


}

