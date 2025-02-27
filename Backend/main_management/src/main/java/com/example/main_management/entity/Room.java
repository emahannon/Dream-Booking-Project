package com.example.main_management.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
public class Room implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean is_active;

    @Column()
    private String facilities;

    @Column(nullable = false)
    private Double price_per_night;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private String room_type;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonIgnore
    private Hotel hotel;


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

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
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

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }


    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", is_active=" + is_active +
                ", facilities='" + facilities + '\'' +
                ", price_per_night=" + price_per_night +
                ", capacity=" + capacity +
                ", room_type='" + room_type + '\'' +
                ", hotel=" + hotel +
                '}';
    }
}
