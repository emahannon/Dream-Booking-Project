package com.example.main_management.services.impl;

import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.repository.BookingRepository;
import com.example.main_management.repository.RoomRepository;
import com.example.main_management.services.RoomService;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    BookingRepository bookingRepository;


    @Override
    public List<Room> findAllRoomByHotel(Hotel hotel) {
        if(hotel!=null){
        return roomRepository.findRoomsByHotel(hotel);}
        else {
            return new ArrayList<>();
        }
    }

    @Override
    public boolean isRoomAvailable(Room room, LocalDate checkInDate, LocalDate checkOutDate) {
        return bookingRepository.findBookingsByRoomAndDates(room.getId(), checkInDate, checkOutDate).isEmpty();
    }

    public Room readById(Long roomId) {
        if(roomId==null){
            return null;
        }
        return roomRepository.findById(roomId).get();
    }

}
