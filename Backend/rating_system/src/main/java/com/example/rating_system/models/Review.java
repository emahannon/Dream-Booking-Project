package com.example.rating_system.models;

import lombok.Data;

@Data
public class Review {
    private Long userId;
    private String username;
    private int rating;
    private String comment;
    private String createdAt;

    public Review(Long userId, String username, int rating, String comment, String createdAt) {
        this.userId = userId;
        this.username = username;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
