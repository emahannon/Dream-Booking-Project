package com.example.main_management.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

public class HotelDto implements Serializable {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String phone;
    private String email;
    private String website;
    private Integer rating;
    private double minTotalPrice;
    private double maxTotalPrice;

    List<RoomDto> roomDtoList;


    public HotelDto() {
    }

    public HotelDto(Long id, String name, String address, String  city,
                    String phone, String email, String website, Integer rating,
                    double minTotalPrice, double maxTotalPrice) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.rating = rating;
        this.minTotalPrice = minTotalPrice;
        this.maxTotalPrice = maxTotalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String  getCity() {
        return city;
    }

    public void setCity(String  city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public double getMinTotalPrice() {
        return minTotalPrice;
    }

    public void setMinTotalPrice(double minTotalPrice) {
        this.minTotalPrice = minTotalPrice;
    }

    public double getMaxTotalPrice() {
        return maxTotalPrice;
    }

    public void setMaxTotalPrice(double maxTotalPrice) {
        this.maxTotalPrice = maxTotalPrice;
    }


    public List<RoomDto> getRoomDtoList() {
        return roomDtoList;
    }

    public void setRoomDtoList(List<RoomDto> roomDtoList) {
        this.roomDtoList = roomDtoList;
    }
}

