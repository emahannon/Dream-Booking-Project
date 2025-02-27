package com.example.main_management.services;

import com.example.main_management.dto.HotelDto;
import com.example.main_management.entity.Hotel;

import java.time.LocalDate;
import java.util.List;

public interface HotelService {


    String findCityByHotel(Hotel hotel);

    Hotel create(Hotel hotel);

    Hotel readById(long id);

    Hotel update(Hotel hotel);

    void delete(long id);

    List<Hotel> searchHotels(String city, LocalDate checkInDate, LocalDate checkOutDate);

    HotelDto totalPriceRoom(Long hotel_id, Long numberOfDays);

    List<HotelDto> searchAndFilterHotels(
            String city,
            LocalDate checkInDate,
            LocalDate checkOutDate,
            Double minPrice,
            Double maxPrice,
            Integer minRating,
            Integer maxGuests
    );


}
