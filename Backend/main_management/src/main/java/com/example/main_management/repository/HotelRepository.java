package com.example.main_management.repository;



import com.example.main_management.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    @Query(value = """
    SELECT DISTINCT h.id, 
                    h.name, 
                    h.address, 
                    h.city_id,
                    h.phone,
                    h.email,
                    h.website, 
                    h.rating
    FROM hotels h
    JOIN rooms r ON h.id = r.hotel_id
    WHERE h.city_id = :cityId
      AND r.is_active = TRUE
      AND r.id NOT IN (
          SELECT b.room_id 
          FROM bookings b
          WHERE b.check_in < :checkOutDate AND b.check_out > :checkInDate
      )
    ORDER BY h.rating DESC
""", nativeQuery = true)
    List<Hotel> findAvailableHotels(
            @Param("cityId") Long cityId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate
    );

    Hotel findHotelById(Long id);

}

