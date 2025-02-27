package com.example.main_management.services.impl;

import com.example.main_management.dto.HotelDto;
import com.example.main_management.dto.RoomDto;
import com.example.main_management.entity.City;
import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.CityRepository;
import com.example.main_management.repository.HotelRepository;
import com.example.main_management.services.RoomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;

import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HotelServiceImplTest {


    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private CityRepository cityRepository;

    @Mock
    private RoomService roomService;

    @InjectMocks
    private HotelServiceImpl hotelService;


    private City validCity;
    private List<Hotel> hotels;

    private Hotel hotel;

    private Hotel hotel2;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        objectMapper = new ObjectMapper();
        validCity = new City();
        validCity.setId(1L);
        validCity.setCity("Paris");

        hotels = List.of(new Hotel(), new Hotel());

        Room room1 = new Room();
        room1.setId(1L);
        room1.setName("Standard Room");
        room1.setPrice_per_night(100.0);
        room1.setCapacity(2);
        room1.setFacilities("WiFi, Air Conditioning");
        room1.setRoom_type("Standard");
        room1.setHotel(hotel);

        Room room2 = new Room();
        room2.setId(2L);
        room2.setName("Deluxe Room");
        room2.setPrice_per_night(200.0);
        room2.setCapacity(4);
        room2.setFacilities("WiFi, TV, Mini Bar");
        room2.setRoom_type("Deluxe");
        room2.setHotel(hotel);

        hotel = new Hotel();
        hotel.setId(1L);
        hotel.setCity(validCity);
        hotel.setName("Luxury Stay");
        hotel.setRating(4.0);
        hotel.setRoomList(List.of(room1, room2));


        Room room3 = new Room();
        room3.setId(3L);
        room3.setPrice_per_night(300.0);
        room3.setCapacity(6);
        room3.setHotel(hotel2);

        hotel2 = new Hotel();
        hotel2.setId(2L);
        hotel2.setName("Budget Stay");
        hotel2.setCity(validCity);
        hotel2.setRating(3.0);
        hotel2.setRoomList(List.of(room3));
    }

    static List<Object[]> validTestData() {
        return List.of(
                new Object[]{"Paris", LocalDate.now().plusDays(1), LocalDate.now().plusDays(5), 2},
                new Object[]{"New York", LocalDate.now().plusDays(3), LocalDate.now().plusDays(6), 2}
        );
    }

    static List<Object[]> invalidTestData() {
        return List.of(
                new Object[]{"Paris", LocalDate.now().minusDays(1), LocalDate.now().plusDays(5), "Check-in date cannot be in the past."},
                new Object[]{"Paris", LocalDate.now().plusDays(5), LocalDate.now().plusDays(3), "Check-out date must be after the check-in date."},
                new Object[]{"Unknown City", LocalDate.now().plusDays(1), LocalDate.now().plusDays(5), "Sorry, we don't have hotels in this city, try another one, please"}
        );
    }

    @ParameterizedTest
    @MethodSource("validTestData")
    void testSearchHotels_ValidData(String city, LocalDate checkInDate, LocalDate checkOutDate, int expectedHotelCount) {
        when(cityRepository.findCityByCity(city)).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkInDate, checkOutDate))
                .thenReturn(hotels);

        List<Hotel> result = hotelService.searchHotels(city, checkInDate, checkOutDate);

        assertNotNull(result);
        assertEquals(expectedHotelCount, result.size());
        verify(cityRepository).findCityByCity(city);
        verify(hotelRepository).findAvailableHotels(validCity.getId(), checkInDate, checkOutDate);
    }

    @ParameterizedTest
    @MethodSource("invalidTestData")
    void testSearchHotels_InvalidData(String city, LocalDate checkInDate, LocalDate checkOutDate, String expectedMessage) {
        if (city.equals("Unknown City")) {
            when(cityRepository.findCityByCity(city)).thenReturn(null);
        }

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> hotelService.searchHotels(city, checkInDate, checkOutDate)
        );

        assertEquals(expectedMessage, exception.getMessage());

        if (!city.equals("Unknown City")) {
            verifyNoInteractions(cityRepository, hotelRepository);
        } else {
            verify(cityRepository).findCityByCity(city);
            verifyNoInteractions(hotelRepository);
        }
    }



    @ParameterizedTest
    @MethodSource("provideHotelsForFindCityByHotel")
    void testFindCityByHotel(Hotel hotel, Optional<City> city, String expectedCityName, Class<? extends Throwable> expectedException) {
        if (hotel != null && hotel.getCity() != null) {
            when(cityRepository.findById(hotel.getCity().getId())).thenReturn(city);
        }

        if (expectedException != null) {
            assertThrows(expectedException, () -> hotelService.findCityByHotel(hotel));
        } else {
            String result = hotelService.findCityByHotel(hotel);
            assertEquals(expectedCityName, result);
        }
    }

    private static Stream<Arguments> provideHotelsForFindCityByHotel() {
        City city1 = new City();
        city1.setId(1L);
        city1.setCity("New York");

        City city2 = new City();
        city2.setId(2L);
        city2.setCity("Los Angeles");

        Hotel hotel1 = new Hotel();
        hotel1.setCity(city1);

        Hotel hotel2 = new Hotel();
        hotel2.setCity(city2);

        return Stream.of(
                // Case 1: Hotel with a valid city, city found in the repository
                Arguments.of(hotel1, Optional.of(city1), "New York", null),
                // Case 2: Hotel with a valid city, city not found in the repository
                Arguments.of(hotel2, Optional.empty(), "", null),
                // Case 3: Null hotel
                Arguments.of(null, null, null, IllegalArgumentException.class),
                // Case 4: Hotel with null city
                Arguments.of(new Hotel(), null, null, NullPointerException.class)
        );
    }

    @Test
    void testCreateHotel_Success() {
        Hotel hotel = new Hotel();
        hotel.setName("Test Hotel");

        when(hotelRepository.save(hotel)).thenReturn(hotel);

        Hotel result = hotelService.create(hotel);

        assertNotNull(result);
        assertEquals("Test Hotel", result.getName());
        verify(hotelRepository).save(hotel);
    }

    @Test
    void testCreateHotel_NullHotel_ThrowsException() {
        NullEntityReferenceException exception = assertThrows(
                NullEntityReferenceException.class,
                () -> hotelService.create(null)
        );

        assertEquals("Hotel cannot be 'null'", exception.getMessage());
        verify(hotelRepository, never()).save(any());
    }

    @Test
    void testReadById_Success() {
        Hotel hotel = new Hotel();
        hotel.setId(1L);
        hotel.setName("Sample Hotel");

        when(hotelRepository.findById(1L)).thenReturn(Optional.of(hotel));

        Hotel result = hotelService.readById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Sample Hotel", result.getName());
        verify(hotelRepository).findById(1L);
    }

    @Test
    void testReadById_NotFound_ThrowsException() {
        when(hotelRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> hotelService.readById(1L)
        );

        assertEquals("Hotel with id 1 not found", exception.getMessage());
        verify(hotelRepository).findById(1L);
    }

    @Test
    void testUpdateHotel_Success() {
        Hotel existingHotel = new Hotel();
        existingHotel.setId(1L);
        existingHotel.setName("Old Name");
        existingHotel.setAddress("Old Address");

        Hotel updatedHotel = new Hotel();
        updatedHotel.setId(1L);
        updatedHotel.setName("New Name");
        updatedHotel.setAddress("New Address");

        when(hotelRepository.findById(1L)).thenReturn(Optional.of(existingHotel));
        when(hotelRepository.save(any(Hotel.class))).thenReturn(updatedHotel);

        Hotel result = hotelService.update(updatedHotel);

        assertNotNull(result);
        assertEquals("New Name", result.getName());
        assertEquals("New Address", result.getAddress());
        verify(hotelRepository).findById(1L);
        verify(hotelRepository).save(any(Hotel.class));
    }

    @Test
    void testUpdateHotel_NullHotel_ThrowsException() {
        NullEntityReferenceException exception = assertThrows(
                NullEntityReferenceException.class,
                () -> hotelService.update(null)
        );

        assertEquals("Hotel cannot be 'null'", exception.getMessage());
        verify(hotelRepository, never()).save(any());
    }

    @Test
    void testDeleteHotel_Success() {
        Hotel hotel = new Hotel();
        hotel.setId(1L);

        when(hotelRepository.findById(1L)).thenReturn(Optional.of(hotel));

        hotelService.delete(1L);

        verify(hotelRepository).findById(1L);
        verify(hotelRepository).delete(hotel);
    }

    @Test
    void testDeleteHotel_NotFound_ThrowsException() {
        when(hotelRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> hotelService.delete(1L)
        );

        assertEquals("Hotel with id 1 not found", exception.getMessage());
        verify(hotelRepository).findById(1L);
        verify(hotelRepository, never()).delete(any());
    }

    @Test
    void testTotalPriceRoom_ValidInput() {
        when(hotelRepository.findById(1L)).thenReturn(java.util.Optional.of(hotel));

        HotelDto hotelDto = hotelService.totalPriceRoom(1L, 3L);

        assertNotNull(hotelDto);
        assertEquals("Luxury Stay", hotelDto.getName());
        assertNotNull(hotelDto.getRoomDtoList());
        assertEquals(2, hotelDto.getRoomDtoList().size());

        RoomDto roomDto1 = hotelDto.getRoomDtoList().get(0);
        assertEquals(1L, roomDto1.getId());
        assertEquals("Standard Room", roomDto1.getName());
        assertEquals(100L, roomDto1.getPrice_per_night());
        assertEquals(300L, roomDto1.getTotal_price());

        RoomDto roomDto2 = hotelDto.getRoomDtoList().get(1);
        assertEquals(2L, roomDto2.getId());
        assertEquals("Deluxe Room", roomDto2.getName());
        assertEquals(200L, roomDto2.getPrice_per_night());
        assertEquals(600L, roomDto2.getTotal_price());

        verify(hotelRepository).findById(1L);
    }

    @Test
    void testTotalPriceRoom_ZeroDays() {
        when(hotelRepository.findById(1L)).thenReturn(java.util.Optional.of(hotel));

        HotelDto hotelDto = hotelService.totalPriceRoom(1L, 0L);

        assertNotNull(hotelDto);
        assertEquals("Luxury Stay", hotelDto.getName());
        assertNotNull(hotelDto.getRoomDtoList());
        assertEquals(2, hotelDto.getRoomDtoList().size());

        RoomDto roomDto1 = hotelDto.getRoomDtoList().get(0);
        assertEquals(1L, roomDto1.getId());
        assertEquals("Standard Room", roomDto1.getName());
        assertEquals(100L, roomDto1.getPrice_per_night());
        assertEquals(100L, roomDto1.getTotal_price()); // 100 * 1

        RoomDto roomDto2 = hotelDto.getRoomDtoList().get(1);
        assertEquals(2L, roomDto2.getId());
        assertEquals("Deluxe Room", roomDto2.getName());
        assertEquals(200L, roomDto2.getPrice_per_night());
        assertEquals(200L, roomDto2.getTotal_price()); // 200 * 1

        verify(hotelRepository).findById(1L);
    }

    @Test
    void testTotalPriceRoom_HotelNotFound() {
        when(hotelRepository.findById(1L)).thenReturn(java.util.Optional.empty());

        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> hotelService.totalPriceRoom(1L, 3L)
        );

        assertEquals("Hotel with id 1 not found", exception.getMessage());
        verify(hotelRepository).findById(1L);
    }

    @Test
    void testSearchAndFilterHotels_ValidInput() {
        LocalDate checkIn = LocalDate.of(2025, 6, 1);
        LocalDate checkOut = LocalDate.of(2025, 6, 4);


        when(cityRepository.findCityByCity("Paris")).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));

        when(hotelService.searchHotels("Paris", checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));

        when(roomService.findAllRoomByHotel(hotel))
                .thenReturn(hotel.getRoomList());
        when(roomService.findAllRoomByHotel(hotel2))
                .thenReturn(hotel2.getRoomList());

        when(roomService.isRoomAvailable(any(Room.class), eq(checkIn), eq(checkOut)))
                .thenReturn(true);

        List<HotelDto> results = hotelService.searchAndFilterHotels(
                "Paris",
                checkIn,
                checkOut,
                300.0,
                700.0,
                4,
                2
        );

        assertNotNull(results);
        assertEquals(1, results.size());

        HotelDto resultHotel = results.get(0);
        assertEquals(1L, resultHotel.getId());
        assertEquals("Luxury Stay", resultHotel.getName());
        assertEquals(300.0, resultHotel.getMinTotalPrice()); // 100.0 * 3 nights
        assertEquals(600.0, resultHotel.getMaxTotalPrice()); // 200.0 * 3 nights
        assertEquals(4, resultHotel.getRating());
    }

    @Test
    void testSearchAndFilterHotels_NoAvailableRooms() {
        LocalDate checkIn = LocalDate.of(2025, 6, 1);
        LocalDate checkOut = LocalDate.of(2025, 6, 4);
        when(cityRepository.findCityByCity("Paris")).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));
        when(hotelService.searchHotels(validCity.getCity(), checkIn, checkOut))
                .thenReturn(List.of(hotel));

        when(roomService.findAllRoomByHotel(hotel))
                .thenReturn(hotel.getRoomList());

        when(roomService.isRoomAvailable(any(Room.class), eq(checkIn), eq(checkOut)))
                .thenReturn(false);

        List<HotelDto> results = hotelService.searchAndFilterHotels(
                validCity.getCity(),
                checkIn,
                checkOut,
                null,
                null,
                null,
                null
        );

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void testSearchAndFilterHotels_MinPriceExceeds() {
        LocalDate checkIn = LocalDate.of(2025, 6, 1);
        LocalDate checkOut = LocalDate.of(2025, 6, 3); // 2 nights


        when(cityRepository.findCityByCity("Paris")).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));
        when(hotelService.searchHotels("Paris", checkIn, checkOut))
                .thenReturn(List.of(hotel));

        when(roomService.findAllRoomByHotel(hotel))
                .thenReturn(hotel.getRoomList());

        when(roomService.isRoomAvailable(any(Room.class), eq(checkIn), eq(checkOut)))
                .thenReturn(true);

        List<HotelDto> results = hotelService.searchAndFilterHotels(
                "Paris",
                checkIn,
                checkOut,
                1000.0,
                null,
                null,
                null
        );

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void testSearchAndFilterHotels_MaxPriceExceeds() {
        LocalDate checkIn = LocalDate.of(2025, 4, 1);
        LocalDate checkOut = LocalDate.of(2025, 4, 3);


        when(cityRepository.findCityByCity("Paris")).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));
        when(hotelService.searchHotels("Paris", checkIn, checkOut))
                .thenReturn(List.of(hotel));

        when(roomService.findAllRoomByHotel(hotel))
                .thenReturn(hotel.getRoomList());

        when(roomService.isRoomAvailable(any(Room.class), eq(checkIn), eq(checkOut)))
                .thenReturn(true);

        List<HotelDto> results = hotelService.searchAndFilterHotels(
                "Paris",
                checkIn,
                checkOut,
                null,
                100.0,
                null,
                null
        );

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void testSearchAndFilterHotels_MinRatingFilter() {
        LocalDate checkIn = LocalDate.of(2025, 4, 1);
        LocalDate checkOut = LocalDate.of(2025, 4, 4); // 3 nights

        when(cityRepository.findCityByCity("Paris")).thenReturn(validCity);
        when(hotelRepository.findAvailableHotels(validCity.getId(), checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));
        when(hotelService.searchHotels("Paris", checkIn, checkOut))
                .thenReturn(List.of(hotel, hotel2));

        when(roomService.findAllRoomByHotel(hotel))
                .thenReturn(hotel.getRoomList());
        when(roomService.findAllRoomByHotel(hotel2))
                .thenReturn(hotel.getRoomList());

        when(roomService.isRoomAvailable(any(Room.class), eq(checkIn), eq(checkOut)))
                .thenReturn(true);

        List<HotelDto> results = hotelService.searchAndFilterHotels(
                "Paris",
                checkIn,
                checkOut,
                null,
                null,
                4,
                null
        );

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("Luxury Stay", results.get(0).getName());
    }


    @Test
    void testUpdateAverageRating_ValidMessage() throws Exception {

        String validMessage = """
        {
            "hotelId": "1",
            "averageRating": "4.5"
        }
    """;

        Hotel mockHotel = new Hotel();
        mockHotel.setId(1L);
        mockHotel.setRating(3.0);

        when(hotelRepository.findById(1L)).thenReturn(Optional.of(mockHotel));
        when(hotelRepository.save(any(Hotel.class))).thenAnswer(invocation -> invocation.getArgument(0));


        hotelService.updateAverageRating(validMessage);


        verify(hotelRepository).findById(1L);
        verify(hotelRepository).save(argThat(hotel -> hotel.getRating() == 4.5));
    }

    @Test
    void testUpdateAverageRating_HotelNotFound() {
        // Arrange
        String validMessage = """
        {
            "hotelId": "1",
            "averageRating": "4.5"
        }
    """;

        when(hotelRepository.findById(1L)).thenReturn(Optional.empty());


        hotelService.updateAverageRating(validMessage);


        verify(hotelRepository).findById(1L);
        verifyNoMoreInteractions(hotelRepository);
    }


    @Test
    void testUpdateAverageRating_InvalidAverageRatingFormat() {
        String invalidMessage = """
        {
            "hotelId": "1",
            "averageRating": "invalid"
        }
    """;
        hotelService.updateAverageRating(invalidMessage);

        verifyNoInteractions(hotelRepository);
    }

    @Test
    void testUpdateAverageRating_InvalidHotelIdFormat() {
        String invalidMessage = """
        {
            "hotelId": "invalid",
            "averageRating": "4.5"
        }
    """;
        hotelService.updateAverageRating(invalidMessage);
        verifyNoInteractions(hotelRepository);
    }


    @Test
    void testUpdateAverageRating_MissingFields() {
        // Arrange
        String invalidMessage = """
        {
            "averageRating": "4.5"
        }
    """;

        hotelService.updateAverageRating(invalidMessage);
        verifyNoInteractions(hotelRepository);
    }
}