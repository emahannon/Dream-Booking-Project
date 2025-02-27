package com.example.main_management.repository;

import com.example.main_management.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    City findCityByCity(String city_name);
}
