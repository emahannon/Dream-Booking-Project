package com.example.main_management.repository;

import com.example.main_management.entity.City;
import com.example.main_management.entity.Country;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;


@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class CityRepositoryTest {


    @Autowired
    CityRepository cityRepository;


    @Autowired
    CountryRepository countryRepository;

    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    void findCityByCity() {
        City city = cityRepository.findCityByCity("Berlin");
        assertNotNull(city);
        assertEquals("Berlin", city.getCity());
    }


    @Test
    void findCityById() {
        City city = cityRepository.findById(1L).get();
        assertNotNull(city);
        assertEquals("Berlin", city.getCity());
    }
}