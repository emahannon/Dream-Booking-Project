package com.example.main_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MainManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainManagementApplication.class, args);
    }

}
