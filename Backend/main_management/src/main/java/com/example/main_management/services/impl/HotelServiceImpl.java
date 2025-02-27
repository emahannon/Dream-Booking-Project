package com.example.main_management.services.impl;


import com.example.main_management.dto.HotelDto;
import com.example.main_management.dto.RoomDto;
import com.example.main_management.dto.mapper.HotelMapper;
import com.example.main_management.entity.City;
import com.example.main_management.entity.Hotel;
import com.example.main_management.entity.Room;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.CityRepository;
import com.example.main_management.repository.HotelRepository;
import com.example.main_management.services.HotelService;
import com.example.main_management.services.RoomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class HotelServiceImpl implements HotelService {

    private HotelRepository hotelRepository;
    private CityRepository cityRepository;

    private RoomService roomService;

    private static final Logger logger = LoggerFactory.getLogger(HotelServiceImpl.class);

    public HotelServiceImpl(HotelRepository hotelRepository, CityRepository cityRepository, RoomService roomService) {
        this.hotelRepository = hotelRepository;
        this.cityRepository = cityRepository;
        this.roomService = roomService;
    }

    @Override
    public String findCityByHotel(Hotel hotel) {
        if(hotel!=null){
        long city_id = hotel.getCity().getId();
        Optional<City> city = cityRepository.findById(city_id);
        if(city.isPresent()){
        return city.get().getCity();}
        }else {
            throw new IllegalArgumentException("Wrong hotel!");
        }
        return "";
    }

    @Override
    public Hotel create(Hotel hotel) {
        if (hotel != null) {

            return hotelRepository.save(hotel);
        }
        throw new NullEntityReferenceException("Hotel cannot be 'null'");
    }

    @Override
    public Hotel readById(long id) {
        return hotelRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Hotel with id " + id + " not found"));
    }

    @Override
    public Hotel update(Hotel hotel) {
        if (hotel != null) {
            Hotel hotelDto = readById(hotel.getId());
            final Hotel hotelUpdated = new Hotel();
            hotelUpdated.setName(hotelDto.getName());
            hotelUpdated.setAddress(hotelDto.getAddress());
            hotelUpdated.setPhone(hotelDto.getPhone());
            hotelUpdated.setEmail(hotelDto.getEmail());
            hotelUpdated.setRating(hotelDto.getRating());
            return hotelRepository.save(hotelUpdated);
        }
        throw new NullEntityReferenceException("Hotel cannot be 'null'");
    }

    @Override
    public void delete(long id) {
        Hotel hotel = readById(id);
        hotelRepository.delete(hotel);
    }

    @Cacheable(value = "hotelSearchCache", key = "#city + ':' + #checkInDate.toString() + ':' + #checkOutDate.toString()")
    public List<Hotel> searchHotels(String city, LocalDate checkInDate, LocalDate checkOutDate) {

        LocalDate today = LocalDate.now();
        if (checkInDate.isBefore(today)) {
            throw new IllegalArgumentException("Check-in date cannot be in the past.");
        }

        if (!checkOutDate.isAfter(checkInDate) || checkOutDate.equals(checkInDate)) {
            throw new IllegalArgumentException("Check-out date must be after the check-in date.");
        }
        City cityFind = cityRepository.findCityByCity(city);
        if(cityFind!=null){
        long cityId = cityFind.getId();
        return hotelRepository.findAvailableHotels(cityId, checkInDate, checkOutDate);}
        else {
            throw new IllegalArgumentException("Sorry, we don't have hotels in this city, try another one, please");
        }
    }

    @Override
    public HotelDto totalPriceRoom(Long hotel_id, Long numberOfDays) {
        Hotel hotel = readById(hotel_id);
        HotelDto hotelDto = HotelMapper.convertoToDto(hotel);
        if(numberOfDays==0){numberOfDays=1L;}
        Long finalNumberOfDays = numberOfDays;
        hotelDto.setRoomDtoList(     hotel.getRoomList().stream()
                .map(room -> {
                    RoomDto roomDTO = new RoomDto();
                    roomDTO.setId(room.getId());
                    roomDTO.setName(room.getName());
                    roomDTO.setPrice_per_night(room.getPrice_per_night());
                    roomDTO.setTotal_price(room.getPrice_per_night() * finalNumberOfDays);
                    roomDTO.setFacilities(room.getFacilities());
                    roomDTO.setCapacity(room.getCapacity());
                    roomDTO.setRoom_type(room.getRoom_type());
                    return roomDTO;
                })
                .collect(Collectors.toList()));
        return hotelDto;
    }


    @RabbitListener(queues = "my-queue")
    public void updateAverageRating(String message) {
        try {

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> messageMap = objectMapper.readValue(message, Map.class);


            if (messageMap.get("hotelId") == null || messageMap.get("averageRating") == null) {
                throw new IllegalArgumentException("Missing required fields: hotelId or averageRating");
            }


            Long hotelId = null;
            try {
                hotelId = Long.valueOf(messageMap.get("hotelId").toString());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid hotelId format: " + messageMap.get("hotelId"));
            }


            BigDecimal averageRating = null;
            try {
                averageRating = new BigDecimal(messageMap.get("averageRating").toString());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid averageRating format: " + messageMap.get("averageRating"));
            }


            Long finalHotelId = hotelId;
            Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(
                    () -> new RuntimeException("Hotel not found: " + finalHotelId)
            );
            hotel.setRating(averageRating.doubleValue());
            hotelRepository.save(hotel);


            logger.info("Updated hotel: " + hotel);

        } catch (RuntimeException e) {

            logger.error("Error processing message: " + message, e);
        } catch (Exception e) {
            logger.error("Unexpected error: " + message, e);
        }
    }

    @Override
    public List<HotelDto> searchAndFilterHotels(
            String city,
            LocalDate checkInDate,
            LocalDate checkOutDate,
            Double minPrice,
            Double maxPrice,
            Integer minRating,
            Integer maxGuests
    ) {
        List<Hotel> hotels  = searchHotels(city, checkInDate, checkOutDate);
        long numberOfDays = java.time.temporal.ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        return hotels.stream().map(hotel -> {
            List<Room> rooms = roomService.findAllRoomByHotel(hotel);

            List<Room> availableRooms = rooms.stream()
                    .filter(room -> roomService.isRoomAvailable(room, checkInDate, checkOutDate))
                    .filter(room -> maxGuests == null || room.getCapacity() >= maxGuests)
                    .toList();

            if (availableRooms.isEmpty()) {
                return null;
            }


            List<Double> totalPrices = availableRooms.stream()
                    .map(room -> room.getPrice_per_night() * numberOfDays)
                    .toList();


            double minRoomPrice = totalPrices.stream().min(Double::compare).orElse(0.0);
            double maxRoomPrice = totalPrices.stream().max(Double::compare).orElse(0.0);

            if ((minPrice != null && minRoomPrice < minPrice) ||
                    (maxPrice != null && maxRoomPrice > maxPrice)) {
                return null;
            }

            if (minRating != null && hotel.getRating() < minRating) {
                return null;
            }

            return new HotelDto(
                    hotel.getId(),
                    hotel.getName(),
                    hotel.getAddress(),
                    findCityByHotel(hotel),
                    hotel.getPhone(),
                    hotel.getEmail(),
                    hotel.getWebsite(),
                    hotel.getRating().intValue(),
                    minRoomPrice,
                    maxRoomPrice
            );
        }).filter(Objects::nonNull).toList();
    }


}