package com.example.main_management.repository;

import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findRoomsByHotel (Hotel hotel);
}
