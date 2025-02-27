package com.example.main_management.entity.enams;

import jakarta.persistence.criteria.CriteriaBuilder;

public enum AdditionalPrice {
    BREAKFAST(100.0),
    EXTRA_BED(150.0);
    private Double price;

    AdditionalPrice(Double price) {
        this.price = price;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
