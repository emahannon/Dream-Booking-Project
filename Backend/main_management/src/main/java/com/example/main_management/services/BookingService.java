package com.example.main_management.services;

import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.Booking;
import org.springframework.stereotype.Service;

import java.util.List;


public interface BookingService {
    List<BookingDetailsDto> findBookingByUserId(Long user_id);

    List<BookingDetailsDto> findPreviousBookingsByUserId(Long userId);

    List<BookingDetailsDto> findNextBookingsByUserId(Long userId);

    List<BookingDetailsDto> findCurrentBookingsByUserId(Long userId);

    Booking createBooking(Long userId, Long roomId, String checkIn, String checkOut, Double price);

    BookInfo createBookingInfo(BookInfo bookInfo, Long roomId);
}
