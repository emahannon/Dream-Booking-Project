package com.example.main_management.repository;

import com.example.main_management.dto.BookingDetailsDto;
import com.example.main_management.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("""
    SELECT b 
    FROM Booking b
    WHERE b.room.id = :roomId
      AND (
          (b.check_in BETWEEN :checkInDate AND :checkOutDate) OR
          (b.check_out BETWEEN :checkInDate AND :checkOutDate) OR
          (b.check_in <= :checkInDate AND b.check_out >= :checkOutDate)
      )
""")
    List<Booking> findBookingsByRoomAndDates(
            @Param("roomId") Long roomId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);


    @Query(value = """
        SELECT new com.example.main_management.dto.BookingDetailsDto(
            b.id, u.id, h.id, h.name, c.city, co.country, 
            r.name, r.facilities, r.capacity, 
            r.room_type, b.check_in, b.check_out, b.total_price)
        FROM Booking b
        JOIN b.user u
        JOIN b.room r
        JOIN r.hotel h
        JOIN h.city c
        JOIN c.country co
        WHERE b.user.id = :userId
        """)
    List<BookingDetailsDto> findBookingDetailsByUserId(@Param("userId") Long userId);


    Optional<Booking> findTopByOrderByIdDesc();

}
