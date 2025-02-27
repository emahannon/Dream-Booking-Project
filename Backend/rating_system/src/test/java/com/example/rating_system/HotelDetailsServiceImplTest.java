package com.example.rating_system;

import com.example.rating_system.models.HotelDetail;
import com.example.rating_system.models.Review;
import com.example.rating_system.repository.HotelDetailsRepository;
import com.example.rating_system.service.HotelDetailsServiceImpl;
import com.example.rating_system.service.HotelNotFoundException;
import static org.mockito.Mockito.*;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class HotelDetailsServiceImplTest {

    @Mock
    private HotelDetailsRepository hotelDetailsRepository;

    @Mock
    private RabbitTemplate rabbitTemplate;

    @InjectMocks
    private HotelDetailsServiceImpl hotelDetailsService;

    private HotelDetail hotelDetail;
    private Review review;

    @BeforeEach
    void setUp() {
        hotelDetail = new HotelDetail();
        hotelDetail.setHotelId(1L);
        Review review1 = new Review(1L, "John Doe", 4, "Great hotel", "2024-10-06T09:28:43.282Z");
        ArrayList<Review> reviews = new ArrayList<>();
        reviews.add(review1);
        hotelDetail.setReviews(reviews);
        ArrayList<String> photos = new ArrayList<>();
        photos.add("photo1.jpg");
        hotelDetail.setPhotos(photos);

        review = new Review(2L, "Jane Doe", 5, "Amazing stay", "2024-10-07T12:00:00.000Z");
    }

    @Test
    void testAddHotelDetails() {
        when(hotelDetailsRepository.save(any(HotelDetail.class))).thenReturn(hotelDetail);
        HotelDetail savedHotel = hotelDetailsService.addHotelDetails(hotelDetail);
        assertNotNull(savedHotel);
        assertEquals(1L, savedHotel.getHotelId());
    }

    @Test
    void testGetHotelDetails() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        HotelDetail foundHotel = hotelDetailsService.getHotelDetails(1L);
        assertNotNull(foundHotel);
        assertEquals(1L, foundHotel.getHotelId());
    }

    @Test
    void testAddReviewToHotel() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        when(hotelDetailsRepository.save(any(HotelDetail.class))).thenReturn(hotelDetail);
        HotelDetail updatedHotel = hotelDetailsService.addReviewToHotel(1L, review);
        assertNotNull(updatedHotel);
        assertEquals(2, updatedHotel.getReviews().size());
    }

    @Test
    void testAddPhotoToHotel() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        when(hotelDetailsRepository.save(any(HotelDetail.class))).thenReturn(hotelDetail);

        HotelDetail updatedHotel = hotelDetailsService.addPhotoToHotel(1L, "photo2.jpg");
        assertNotNull(updatedHotel);
        assertEquals(2, updatedHotel.getPhotos().size());
    }

    @Test
    void testGetAllReviewsByHotelId() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        List<Review> reviews = hotelDetailsService.getAllReviewsByHotelId(1L);
        assertNotNull(reviews);
        assertEquals(1, reviews.size());
    }

    @Test
    void testGetAvrRating() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        doNothing().when(rabbitTemplate).convertAndSend(nullable(String.class), anyString());


        Double avgRating = hotelDetailsService.getAvrRating(1L);
        assertNotNull(avgRating);
        assertEquals(4.0, avgRating);
    }

    @Test
    void testAddReviewToHotel_HotelNotFound() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(null);

        HotelNotFoundException exception = assertThrows(HotelNotFoundException.class, () -> {
            hotelDetailsService.addReviewToHotel(1L, new Review(2L, "Jane Doe", 5, "Amazing stay", "2024-10-07T12:00:00.000Z"));
        });

        assertEquals("Hotel not found with ID: 1", exception.getMessage());
    }

    @Test
    void testAddPhotoToHotel_HotelNotFound() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(null);

        HotelNotFoundException exception = assertThrows(HotelNotFoundException.class, () -> {
            hotelDetailsService.addPhotoToHotel(1L, "photo_url.jpg");
        });

        assertEquals("Hotel not found with ID: 1", exception.getMessage());
    }



    @Test
    void testGetAvrRating_HotelNotFound() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(null);

        HotelNotFoundException exception = assertThrows(HotelNotFoundException.class, () -> {
            hotelDetailsService.getAvrRating(1L);
        });

        assertEquals("Hotel not found with ID: 1", exception.getMessage());
    }

    @Test
    void testGetAllReviewsByHotelIdIsNULL() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(null);
        List<Review> reviews = hotelDetailsService.getAllReviewsByHotelId(1L);
        assertNotNull(reviews);
        assertEquals(0, reviews.size());
    }

    @Test
    void testGetAvrRating_EmptyReviews() {
        when(hotelDetailsRepository.findByHotelId(1L)).thenReturn(hotelDetail);
        hotelDetail.setReviews(new ArrayList<>());

        Double averageRating = hotelDetailsService.getAvrRating(1L);

        assertEquals(0.0, averageRating);
        verify(rabbitTemplate, times(1)).convertAndSend(nullable(String.class), anyString());
    }
}







