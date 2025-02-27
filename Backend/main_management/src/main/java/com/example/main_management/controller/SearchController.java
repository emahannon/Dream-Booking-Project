package com.example.main_management.controller;


import com.example.main_management.dto.HotelDto;
import com.example.main_management.dto.RoomDto;
import com.example.main_management.dto.mapper.HotelMapper;
import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.services.HotelService;
import com.example.main_management.services.RoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/main/")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {


    @Autowired
    private HotelService hotelService;

    @Autowired
    private RoomService roomService;

    Long numberOfDays = 0L;

    @GetMapping("/search")
    public ResponseEntity<?> searchHotels(
            @RequestParam String city,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) Integer maxGuests
    ) {
        try {
            List<HotelDto> hotelDtos = hotelService.searchAndFilterHotels(city, checkInDate, checkOutDate, minPrice, maxPrice, minRating, maxGuests);
            return ResponseEntity.ok(hotelDtos);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    @GetMapping("/hotel_info/{id}")
    public ResponseEntity<?> getHotelInformation(@PathVariable Long id) {
        try{
        HotelDto hotel = hotelService.totalPriceRoom(id, numberOfDays);
        return ResponseEntity.ok( hotel);}
        catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
