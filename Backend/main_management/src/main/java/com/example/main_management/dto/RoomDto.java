package com.example.main_management.dto;

import com.example.main_management.entity.Hotel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

public class RoomDto {

    private Long id;

    private String name;

    private String facilities;

    private Double price_per_night;

    private Integer capacity;

    private String room_type;

    private Double total_price;

    public RoomDto() {
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

    public String getFacilities() {
        return facilities;
    }

    public void setFacilities(String facilities) {
        this.facilities = facilities;
    }

    public Double getPrice_per_night() {
        return price_per_night;
    }

    public void setPrice_per_night(Double price_per_night) {
        this.price_per_night = price_per_night;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public Double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(Double total_price) {
        this.total_price = total_price;
    }

}
