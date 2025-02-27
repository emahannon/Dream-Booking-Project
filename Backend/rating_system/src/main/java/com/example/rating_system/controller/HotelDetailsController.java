package com.example.rating_system.controller;

import com.example.rating_system.models.HotelDetail;
import com.example.rating_system.models.Review;
import com.example.rating_system.service.HotelDetailsService;
import com.example.rating_system.service.HotelNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel-detail")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelDetailsController {

    @Autowired
    private HotelDetailsService hotelDetailsService;


    @PostMapping
    public HotelDetail addHotelDetails(@RequestBody HotelDetail hotelDetails) {
        return hotelDetailsService.addHotelDetails(hotelDetails);
    }

    @GetMapping("/{hotelId}")
    public HotelDetail getHotelDetails(@PathVariable long hotelId) {
        return hotelDetailsService.getHotelDetails(hotelId);
    }


    @PostMapping("/{hotelId}/{userId}/reviews")
    public ResponseEntity<?> addReviewToHotel(@PathVariable long hotelId, @PathVariable long userId, @RequestBody Review review) {
        review.setUserId(userId);

        HotelDetail hotelDetail = hotelDetailsService.addReviewToHotel(hotelId, review);
        hotelDetailsService.getAvrRating(hotelId);
        return ResponseEntity.ok(hotelDetail);
    }

    @GetMapping("/{hotelId}/reviews")
    public List<Review> getReviewsByHotelId(@PathVariable long hotelId) {
        return hotelDetailsService.getAllReviewsByHotelId(hotelId);
    }


    @PostMapping("/{hotelId}/photos")
    public HotelDetail addPhotoToHotel(@PathVariable long hotelId, @RequestBody String photo) {
        return hotelDetailsService.addPhotoToHotel(hotelId, photo);
    }


    @ExceptionHandler(HotelNotFoundException.class)
    public ResponseEntity<String> handleHotelNotFoundException(HotelNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

}