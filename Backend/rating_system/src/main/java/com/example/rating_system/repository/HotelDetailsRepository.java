package com.example.rating_system.repository;

import com.example.rating_system.models.HotelDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelDetailsRepository extends MongoRepository<HotelDetail, String> {
    HotelDetail findByHotelId(long hotelId);
}
