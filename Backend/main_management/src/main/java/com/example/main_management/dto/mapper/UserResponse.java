package com.example.main_management.dto.mapper;

import com.example.main_management.dto.UserDto;
import com.example.main_management.entity.User;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@AllArgsConstructor
public class UserResponse {
    Long id;
    String name;
    String surname;
    String email;
    String phone;
    String birthday;

    public UserResponse(UserDto user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        if(user.getBirthday()!=null){
        this.birthday = user.getBirthday().toString();}
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBirthday() {
        return birthday;
    }
}