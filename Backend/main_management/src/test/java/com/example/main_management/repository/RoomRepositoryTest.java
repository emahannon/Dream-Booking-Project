package com.example.main_management.repository;

import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.entity.User;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class RoomRepositoryTest {

    @Autowired
    RoomRepository roomRepository;


    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    void findRoomsByHotel() {
        Hotel hotel = hotelRepository.findHotelById(1L);
        List<Room> rooms = roomRepository.findRoomsByHotel(hotel);

        assertNotNull(rooms);
        assertEquals(4, rooms.size(), "The hotel should have 2 rooms");
        assertTrue(rooms.contains(roomRepository.findById(1L).get()), "The rooms list should contain room1");
        assertTrue(rooms.contains(roomRepository.findById(2L).get()), "The rooms list should contain room2");
        assertTrue(rooms.contains(roomRepository.findById(3L).get()), "The rooms list should contain room3");
        assertTrue(rooms.contains(roomRepository.findById(4L).get()), "The rooms list should contain room4");
    }


    @Test
    void findById_ShouldReturnRoom_WhenRoomExists() {

        Optional<Room> result = roomRepository.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        assertEquals("Executive Room", result.get().getName());
    }


    @Test
    void findById_ShouldReturnEmptyOptional_WhenRoomDoesNotExist() {
        Optional<Room> result = roomRepository.findById(999L);
        assertFalse(result.isPresent(), "Expected an empty Optional, but got a value.");
    }

}