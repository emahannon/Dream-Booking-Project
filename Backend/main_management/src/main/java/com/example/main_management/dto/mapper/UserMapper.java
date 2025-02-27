package com.example.main_management.dto.mapper;

import com.example.main_management.dto.UserDto;
import com.example.main_management.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserMapper {

    static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setBirthday(userDto.getBirthday());
        user.setPhone(userDto.getPhone());
        user.setRole(userDto.getRole());
        return user;
    }


    public static UserDto convertToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setPassword(user.getPassword());
        userDto.setBirthday(user.getBirthday());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setRole(user.getRole());
        return userDto;
    }
}
