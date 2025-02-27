package com.example.main_management.dto.mapper;

import com.example.main_management.dto.HotelDto;
import com.example.main_management.entity.Hotel;

public class HotelMapper {


    public static HotelDto convertoToDto(Hotel hotel){
        HotelDto hotelDto = new HotelDto();
        hotelDto.setId(hotel.getId());
        hotelDto.setName(hotel.getName());
        hotelDto.setAddress(hotel.getAddress());
        hotelDto.setPhone(hotel.getPhone());
        hotelDto.setWebsite(hotel.getWebsite());
        hotelDto.setCity(hotel.getCity().getCity());
        hotelDto.setRating(hotel.getRating().intValue());
        hotelDto.setEmail(hotel.getEmail());
        return hotelDto;

    }
}
