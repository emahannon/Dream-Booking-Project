package com.example.main_management.dto;

import java.time.LocalDate;
import java.util.Date;

public class BookingDetailsDto {
    private Long bookingId;

    private Long hotelId;

    private Long userId;

    private String hotelName;
    private String cityName;
    private String countryName;
    private String roomName;
    private String facilities;
    private Integer capacity;
    private String roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Double totalPrice;

    public BookingDetailsDto() {
    }

    public BookingDetailsDto(Long bookingId, Long userId, Long hotelId, String hotelName, String cityName, String countryName, String roomName, String facilities, Integer capacity, String roomType, LocalDate checkIn, LocalDate checkOut, Double totalPrice) {

        this.bookingId = bookingId;
        this.userId = userId;
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.cityName = cityName;
        this.countryName = countryName;
        this.roomName = roomName;
        this.facilities = facilities;
        this.capacity = capacity;
        this.roomType = roomType;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalPrice = totalPrice;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getFacilities() {
        return facilities;
    }

    public void setFacilities(String facilities) {
        this.facilities = facilities;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
