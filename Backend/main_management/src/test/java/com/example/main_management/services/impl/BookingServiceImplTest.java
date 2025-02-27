package com.example.main_management.services.impl;

import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.entity.Booking;
import com.example.main_management.entity.User;
import com.example.main_management.entity.enams.AdditionalPrice;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.BookingRepository;
import com.example.main_management.repository.RoomRepository;
import com.example.main_management.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.example.main_management.entity.Room;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {


    @InjectMocks
    private BookingServiceImpl bookingService;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoomRepository roomRepository;


    private User mockUser;
    private Room mockRoom;
    private Booking mockBooking;

    private BookingDetailsDto mockBookingDetails;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setName("John Doe");

        mockRoom = new Room();
        mockRoom.setId(1L);
        mockRoom.setName("Deluxe Room");
        mockRoom.setPrice_per_night(100.0);

        mockBooking = new Booking();
        mockBooking.setId(1L);
        mockBooking.setUser(mockUser);
        mockBooking.setRoom(mockRoom);
        mockBooking.setCheck_in(LocalDate.of(2023, 1, 1));
        mockBooking.setCheck_out(LocalDate.of(2023, 1, 5));
        mockBooking.setTotal_price(500.0);


        mockBookingDetails = new BookingDetailsDto();
        mockBookingDetails.setUserId(1L);
        mockBookingDetails.setRoomName("Room name");
        mockBookingDetails.setRoomType("Single");
        mockBookingDetails.setCheckIn(LocalDate.of(2023, 1, 1));
        mockBookingDetails.setCheckOut(LocalDate.of(2023, 1, 5));
    }

    @Test
    void createBooking_Successful() {

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(mockRoom));
        when(bookingRepository.save(any(Booking.class))).thenReturn(mockBooking);

        Booking result = bookingService.createBooking(1L, 1L, "2023-01-01", "2023-01-05", 500.0);

        assertNotNull(result);
        assertEquals(mockUser, result.getUser());
        assertEquals(mockRoom, result.getRoom());
        assertEquals(LocalDate.of(2023, 1, 1), result.getCheck_in());
        assertEquals(LocalDate.of(2023, 1, 5), result.getCheck_out());
        assertEquals(500.0, result.getTotal_price());
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    void createBooking_UserNotFound() {

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        NullEntityReferenceException exception = assertThrows(NullEntityReferenceException.class,
                () -> bookingService.createBooking(1L, 1L, "2023-01-01", "2023-01-05", 500.0));
        assertEquals("User not found", exception.getMessage());
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void createBooking_RoomNotFound() {

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(roomRepository.findById(1L)).thenReturn(Optional.empty());

        NullEntityReferenceException exception = assertThrows(NullEntityReferenceException.class,
                () -> bookingService.createBooking(1L, 1L, "2023-01-01", "2023-01-05", 500.0));
        assertEquals("Room not found", exception.getMessage());
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void createBooking_InvalidDateRange() {

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(roomRepository.findById(1L)).thenReturn(Optional.of(mockRoom));


        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> bookingService.createBooking(1L, 1L, "2023-01-05", "2023-01-01", 500.0));
        assertEquals("Check-out date must be after check-in date", exception.getMessage());
        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void getTotalPrice_CalculatesCorrectly() {

        LocalDate checkInDate = LocalDate.of(2023, 1, 1);
        LocalDate checkOutDate = LocalDate.of(2023, 1, 5);

        Double totalPrice = bookingService.getTotalPrice(mockRoom, checkInDate, checkOutDate, false, false);

        assertNotNull(totalPrice);
        assertEquals(400.0, totalPrice);
    }

    @Test
    void calculateAdditionalPrice_WithBreakfastAndExtraBed() {
        Double totalPrice = bookingService.calculateAdditionalPrice(true, true);

        assertNotNull(totalPrice);
        assertEquals(AdditionalPrice.BREAKFAST.getPrice() + AdditionalPrice.EXTRA_BED.getPrice(), totalPrice);
    }

    @Test
    void calculateAdditionalPrice_WithOnlyBreakfast() {
        Double totalPrice = bookingService.calculateAdditionalPrice(true, false);


        assertNotNull(totalPrice);
        assertEquals(AdditionalPrice.BREAKFAST.getPrice(), totalPrice);
    }

    @Test
    void calculateAdditionalPrice_WithOnlyExtraBed() {
        Double totalPrice = bookingService.calculateAdditionalPrice(false, true);

        assertNotNull(totalPrice);
        assertEquals(AdditionalPrice.EXTRA_BED.getPrice(), totalPrice);
    }

    @Test
    void calculateAdditionalPrice_WithNeitherOption() {
        Double totalPrice = bookingService.calculateAdditionalPrice(false, false);

        assertNotNull(totalPrice);
        assertEquals(0.0, totalPrice);
    }

    @Test
    void findBookingByUserId_ReturnsBookings() {

        List<BookingDetailsDto> bookingDetails = List.of(mockBookingDetails);
        when(bookingRepository.findBookingDetailsByUserId(1L)).thenReturn(bookingDetails);

        List<BookingDetailsDto> result = bookingService.findBookingByUserId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(mockBookingDetails, result.get(0));
    }

    @Test
    void findPreviousBookingsByUserId_ReturnsPreviousBookings() {

        LocalDate currentDate = LocalDate.now();
        BookingDetailsDto previousBooking = new BookingDetailsDto();
        previousBooking.setCheckIn(currentDate.minusDays(5));
        previousBooking.setCheckOut(currentDate.minusDays(1));

        List<BookingDetailsDto> bookings = new ArrayList<>();
        bookings.add(previousBooking);
        when(bookingRepository.findBookingDetailsByUserId(1L)).thenReturn(bookings);

        List<BookingDetailsDto> result = bookingService.findPreviousBookingsByUserId(1L);


        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(previousBooking, result.get(0));
    }

    @Test
    void findNextBookingsByUserId_ReturnsNextBookings() {

        LocalDate currentDate = LocalDate.now();
        BookingDetailsDto nextBooking = new BookingDetailsDto();
        nextBooking.setCheckIn(currentDate.plusDays(1));
        nextBooking.setCheckOut(currentDate.plusDays(5));

        List<BookingDetailsDto> bookings = new ArrayList<>();
        bookings.add(nextBooking);
        when(bookingRepository.findBookingDetailsByUserId(1L)).thenReturn(bookings);


        List<BookingDetailsDto> result = bookingService.findNextBookingsByUserId(1L);


        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(nextBooking, result.get(0));
    }

    @Test
    void findCurrentBookingsByUserId_ReturnsCurrentBookings() {

        LocalDate currentDate = LocalDate.now();
        BookingDetailsDto currentBooking = new BookingDetailsDto();
        currentBooking.setCheckIn(currentDate.minusDays(1));
        currentBooking.setCheckOut(currentDate.plusDays(1));

        List<BookingDetailsDto> bookings = new ArrayList<>();
        bookings.add(currentBooking);
        when(bookingRepository.findBookingDetailsByUserId(1L)).thenReturn(bookings);


        List<BookingDetailsDto> result = bookingService.findCurrentBookingsByUserId(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(currentBooking, result.get(0));
    }
}