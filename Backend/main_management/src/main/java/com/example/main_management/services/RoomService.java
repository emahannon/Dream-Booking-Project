package com.example.main_management.services;

import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;

import java.time.LocalDate;
import java.util.List;

public interface RoomService {

    List<Room> findAllRoomByHotel (Hotel hotel);
    boolean isRoomAvailable(Room room, LocalDate checkInDate, LocalDate checkOutDate);

    Room readById(Long roomId);
}
