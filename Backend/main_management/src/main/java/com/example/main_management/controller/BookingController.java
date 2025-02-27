package com.example.main_management.controller;


import com.example.main_management.config.security.CustomUserDetails;
import com.example.main_management.dto.BookInfoDto;
import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.dto.mapper.BookInfoMapper;
import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.Booking;
import com.example.main_management.entity.Room;
import com.example.main_management.services.BookingService;
import com.example.main_management.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/booking/")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    BookingService bookingService;


    @Autowired
    RoomService roomService;

    @PostMapping("/{hotelId}/{roomId}/{checkIn}/{checkOut}")
    public ResponseEntity<?> createBooking(@PathVariable Long hotelId,
                                           @PathVariable Long roomId,
                                           @PathVariable String checkIn,
                                           @PathVariable String checkOut,
                                           @RequestBody BookInfoDto bookInfoDto) {

        try {
            LocalDate checkInDate = LocalDate.parse(checkIn, DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate checkOutDate = LocalDate.parse(checkOut, DateTimeFormatter.ISO_LOCAL_DATE);
            Room room = roomService.readById(roomId);
            boolean roomAvailable = roomService.isRoomAvailable(room, checkInDate, checkOutDate);
            if (!roomAvailable) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Room is not available for the selected dates");
            }
            bookInfoDto.setCheckInDate(checkIn);
            bookInfoDto.setCheckOutDate(checkOut);
            BookInfo bookInfo = bookingService.createBookingInfo(BookInfoMapper.convertToEntity(bookInfoDto), roomId);
            Booking booking = bookingService.createBooking(getCurrentUser(), roomId, checkIn, checkOut, bookInfo.getTotalPrice());
            return ResponseEntity.ok(bookInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    @GetMapping("/view")
    public List<BookingDetailsDto> getBookingsByUserId() {
        return bookingService.findBookingByUserId(getCurrentUser());
    }

    @GetMapping("/view-past")
    public List<BookingDetailsDto> getPastBookingsByUserId() {
        return bookingService.findPreviousBookingsByUserId(getCurrentUser());
    }
    @GetMapping("/view-upcoming")
    public List<BookingDetailsDto> getNextBookingsByUserId() {
        return bookingService.findNextBookingsByUserId(getCurrentUser());
    }

    @GetMapping("/view-current")
    public List<BookingDetailsDto> getCurrentBookingsByUserId() {
        return bookingService.findCurrentBookingsByUserId(getCurrentUser());
    }

    public Long getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return ((CustomUserDetails) authentication.getPrincipal()).getId();
        }
        return null;
    }
}
