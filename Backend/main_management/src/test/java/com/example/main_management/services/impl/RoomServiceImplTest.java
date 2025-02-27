package com.example.main_management.services.impl;

import com.example.main_management.entity.Booking;
import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.repository.BookingRepository;
import com.example.main_management.repository.RoomRepository;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.junit.jupiter.params.provider.Arguments;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.mockito.Mockito.*;


import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
class RoomServiceImplTest {

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private RoomServiceImpl roomService;

    @ParameterizedTest
    @MethodSource("provideHotelsForFindAllRoomByHotel")
    void testFindAllRoomByHotel(Hotel hotel, List<Room> expectedRooms) {
       if (hotel != null) {
            when(roomRepository.findRoomsByHotel(hotel)).thenReturn(expectedRooms);
        }
        List<Room> result = roomService.findAllRoomByHotel(hotel);
        assertEquals(expectedRooms, result);
    }

    private static Stream<Arguments> provideHotelsForFindAllRoomByHotel() {
        Hotel hotel = new Hotel();
        Room room1 = new Room();
        Room room2 = new Room();
        return Stream.of(
                Arguments.of(hotel, List.of(room1, room2)),
                Arguments.of(null, Collections.emptyList())
        );
    }

    @ParameterizedTest
    @MethodSource("provideRoomsAndDatesForIsRoomAvailable")
    void testIsRoomAvailable(Room room, LocalDate checkInDate, LocalDate checkOutDate, boolean expectedAvailability) {
        if (expectedAvailability) {
            when(bookingRepository.findBookingsByRoomAndDates(room.getId(), checkInDate, checkOutDate)).thenReturn(Collections.emptyList());
        } else {
            when(bookingRepository.findBookingsByRoomAndDates(room.getId(), checkInDate, checkOutDate)).thenReturn(List.of(new Booking()));
        }
        boolean result = roomService.isRoomAvailable(room, checkInDate, checkOutDate);
        assertEquals(expectedAvailability, result);
    }

    private static Stream<Arguments> provideRoomsAndDatesForIsRoomAvailable() {
        Room room = new Room();
        room.setId(1L);
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        return Stream.of(
                Arguments.of(room, today, tomorrow, true),
                Arguments.of(room, today, tomorrow, false)
        );
    }

    @ParameterizedTest
    @MethodSource("provideRoomIdsForReadById")
    void testReadById(Long roomId, Room expectedRoom) {
        if (roomId != null) {
            when(roomRepository.findById(roomId)).thenReturn(Optional.ofNullable(expectedRoom));
        }

        Room result = roomService.readById(roomId);
        assertEquals(expectedRoom, result);
    }

    private static Stream<Arguments> provideRoomIdsForReadById() {
        Room room = new Room();
        room.setId(1L);

        return Stream.of(
                Arguments.of(1L, room),
                Arguments.of(null, null)
        );
    }
}