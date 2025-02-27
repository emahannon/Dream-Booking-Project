package com.example.rating_system.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "hotel_details")
public class HotelDetail {

    @Id
    private String id;

    private long hotelId;

    private List<Review> reviews;
    private List<String> photos;

    public HotelDetail() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getHotelId() {
        return hotelId;
    }

    public void setHotelId(long hotelId) {
        this.hotelId = hotelId;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    @Override
    public String toString() {
        return "HotelDetail{" +
                "id='" + id + '\'' +
                ", hotelId=" + hotelId +
                ", reviews=" + reviews +
                ", photos=" + photos +
                '}';
    }
}