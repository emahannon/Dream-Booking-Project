package com.example.rating_system.service;

import com.example.rating_system.models.HotelDetail;
import com.example.rating_system.models.Review;

import java.math.BigDecimal;
import java.util.List;

public interface HotelDetailsService {

    HotelDetail addHotelDetails(HotelDetail hotelDetails);

    HotelDetail getHotelDetails(long hotelId);

    HotelDetail addReviewToHotel(long hotelId, Review review);

    HotelDetail addPhotoToHotel(long hotelId, String photo);

    List<Review> getAllReviewsByHotelId(long hotelId);

    Double getAvrRating(long hotelId);
}
