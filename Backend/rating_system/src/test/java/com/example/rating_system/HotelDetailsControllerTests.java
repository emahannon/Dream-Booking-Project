package com.example.rating_system;

import com.example.rating_system.models.HotelDetail;
import com.example.rating_system.models.Review;
import com.example.rating_system.service.HotelDetailsService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class HotelDetailsControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    private HotelDetail sampleHotel;

    HotelDetail hotel1;

    HotelDetail hotel2;


    @BeforeAll
    void setupTestData() {
        hotel1 = new HotelDetail();
        hotel1.setHotelId(1L);
        hotel1.setReviews(Arrays.asList(
                new Review(1L, "John Doe", 4, "Great stay!", "2024-10-06T09:28:43.282Z"),
                new Review(4L, "Emily Davis", 4, "Service was slow.", "2024-10-13T11:36:27.282Z")
        ));
        hotel1.setPhotos(Arrays.asList(
                "https://img.freepik.com/free-photo/folded-towels-bed_1203-973.jpg",
                "https://img.freepik.com/free-photo/folded_1203-973.jpg"
        ));

        hotel2 = new HotelDetail();
        hotel2.setHotelId(2L);
        hotel2.setReviews(Arrays.asList(
                new Review(2L, "Jane Smith", 4, "Loved the breakfast!", "2024-10-15T21:12:00.282Z"),
                new Review(3L, "Robert Johnson", 5, "Eco-friendly hotel!", "2024-10-12T20:47:41.282Z")
        ));

        // Post hotel data to local MongoDB
      //  restTemplate.postForEntity("/api/hotel-detail", hotel1, HotelDetail.class);
      //  restTemplate.postForEntity("/api/hotel-detail", hotel2, HotelDetail.class);
    }

/*
    @Test
    void testAddHotelDetails() {
        ResponseEntity<HotelDetail> response = restTemplate.postForEntity("/api/hotel-detail", hotel1, HotelDetail.class);
        assertNotNull(response.getBody());
        restTemplate.postForEntity("/api/hotel-detail", hotel2, HotelDetail.class);
    }

    @Test
    void testGetHotelDetails() {
        ResponseEntity<HotelDetail> response = restTemplate.getForEntity("/api/hotel-detail/1", HotelDetail.class);
        assertNotNull(response.getBody());
        assertEquals(1L, response.getBody().getHotelId());
    }

    @Test
    void testAddReviewToHotel() {
        Review review = new Review(1L, "John Doe", 4, "Great hotel", "2024-10-06T09:28:43.282Z");

        ResponseEntity<HotelDetail> response = restTemplate.exchange(
                "/api/hotel-detail/1/1/reviews", HttpMethod.POST, new HttpEntity<>(review), HotelDetail.class);

        assertNotNull(response.getBody());
    }

    @Test
    void testGetReviewsByHotelId() {
        ResponseEntity<List> response = restTemplate.getForEntity("/api/hotel-detail/1/reviews", List.class);
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isEmpty());
    }

    @Test
    void testAddPhotoToHotel_Success() {
        String photoUrl = "https://example.com/photo.jpg";
        ResponseEntity<HotelDetail> response = restTemplate.exchange(
                "/api/hotel-detail/1/photos", HttpMethod.POST, new HttpEntity<>(photoUrl), HotelDetail.class);

        assertNotNull(response.getBody());
        assertTrue(response.getBody().getPhotos().contains(photoUrl));
    }

    @Test
    void testAddPhotoToHotel_HotelNotFound() {
        String photoUrl = "https://example.com/photo.jpg";
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/hotel-detail/999/photos", HttpMethod.POST, new HttpEntity<>(photoUrl), String.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains("Hotel not found"));
    }*/
}
