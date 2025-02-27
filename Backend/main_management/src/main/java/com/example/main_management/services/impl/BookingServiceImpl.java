package com.example.main_management.services.impl;

import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.Room;
import com.example.main_management.entity.User;
import com.example.main_management.entity.Booking;
import com.example.main_management.entity.enams.AdditionalPrice;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.BookInfoRepository;
import com.example.main_management.repository.BookingRepository;
import com.example.main_management.repository.RoomRepository;
import com.example.main_management.repository.UserRepository;
import com.example.main_management.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BookingServiceImpl implements BookingService {


    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    BookInfoRepository bookInfoRepository;

    @Override
    public Booking createBooking(Long userId, Long roomId, String checkIn, String checkOut, Double totalPrice) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Room> room = roomRepository.findById(roomId);

        if (!user.isPresent()) {
            throw new NullEntityReferenceException("User not found");
        }

        if (!room.isPresent()) {
            throw new NullEntityReferenceException("Room not found");
        }

        LocalDate checkInDate = LocalDate.parse(checkIn);
        LocalDate checkOutDate = LocalDate.parse(checkOut);

        if (checkOutDate.isBefore(checkInDate)) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }
        Booking booking = new Booking();
        booking.setUser(user.get());
        booking.setRoom(room.get());
        booking.setCheck_in(checkInDate);
        booking.setCheck_out(checkOutDate);
        booking.setTotal_price(totalPrice);
        return bookingRepository.save(booking);
    }

    @Override
    public BookInfo createBookingInfo(BookInfo bookInfo, Long roomId) {

        Optional<Room> room = roomRepository.findById(roomId);

        if (!room.isPresent()) {
            throw new NullEntityReferenceException("Room not found");
        }

        bookInfo.setRoom(room.get());

        LocalDate today = LocalDate.now();
        LocalDate maxDateOfBirth = today.minusYears(150);
        if (bookInfo.getDateOfBirth().isAfter(today) || bookInfo.getDateOfBirth().isBefore(maxDateOfBirth) || bookInfo.getDateOfBirth().equals(today)) {
            throw new IllegalArgumentException("Date of birth must not be in the future, or more 150 years ago");
        }
        if (bookInfo.getCheckInDate().isBefore(today)) {
            throw new IllegalArgumentException("Check-in date must not be in the past.");
        }
        if (!bookInfo.getCheckOutDate().isAfter(bookInfo.getCheckInDate())) {
            throw new IllegalArgumentException("Check-out date must be at least one day after the check-in date.");
        }


        if (bookInfo.getNumOfGuests() < 1 || bookInfo.getNumOfGuests() > 5) {
            throw new IllegalArgumentException("Number of guests must be between 1 and 5.");
        }


        double totalPrice = getTotalPrice(room.get(), bookInfo.getCheckInDate(), bookInfo.getCheckOutDate(), bookInfo.getBreakfastIncluded(), bookInfo.getExtraBedNeeded());
      /*  double addPrice = calculateAdditionalPrice(bookInfo.getBreakfastIncluded(), bookInfo.getExtraBedNeeded());

        if(addPrice!=0.0){
            totalPrice += addPrice;
        }*/

        bookInfo.setTotalPrice(totalPrice);

        return bookInfoRepository.save(bookInfo);
    }


    public Double getTotalPrice(Room room, LocalDate checkInDate, LocalDate checkOutDate, Boolean breakfastIncluded, Boolean extraBedNeeded){
        long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        return (room.getPrice_per_night() * daysBetween) + calculateAdditionalPrice(breakfastIncluded, extraBedNeeded);
    }

    public Double calculateAdditionalPrice(Boolean breakfastIncluded, Boolean extraBedNeeded) {
        Double totalPrice = 0.0;

        if (Boolean.TRUE.equals(breakfastIncluded)) {
            totalPrice += AdditionalPrice.BREAKFAST.getPrice();
        }

        if (Boolean.TRUE.equals(extraBedNeeded)) {
            totalPrice += AdditionalPrice.EXTRA_BED.getPrice();
        }
        return totalPrice;
    }

    @Override
    public List<BookingDetailsDto> findBookingByUserId(Long user_id) {
        return bookingRepository.findBookingDetailsByUserId(user_id);
    }

    @Override
    public List<BookingDetailsDto> findPreviousBookingsByUserId(Long userId) {
        LocalDate currentDate = LocalDate.now();


        return bookingRepository.findBookingDetailsByUserId(userId).stream()
                .filter(booking -> booking.getCheckIn().isBefore(currentDate))
                .sorted(Comparator.comparing(BookingDetailsDto::getCheckOut))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDetailsDto> findNextBookingsByUserId(Long userId) {
        LocalDate currentDate = LocalDate.now();

        return bookingRepository.findBookingDetailsByUserId(userId).stream()
                .filter(booking -> !booking.getCheckIn().isBefore(currentDate))
                .sorted(Comparator.comparing(BookingDetailsDto::getCheckIn))
                .collect(Collectors.toList());
    }


    @Override
    public List<BookingDetailsDto> findCurrentBookingsByUserId(Long userId) {
        LocalDate currentDate = LocalDate.now();

        return bookingRepository.findBookingDetailsByUserId(userId).stream()
                .filter(booking ->
                        (booking.getCheckIn().isBefore(currentDate) || booking.getCheckIn().isEqual(currentDate)) &&
                        (booking.getCheckOut().isAfter(currentDate) || booking.getCheckOut().isEqual(currentDate))
                )
                .sorted(Comparator.comparing(BookingDetailsDto::getCheckIn))
                .collect(Collectors.toList());
    }
}
