package com.example.main_management.services;

import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.UserRequest;
import com.example.main_management.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User create(User user);
    UserDto readById(long id);
    User update(User user);
    Optional<User> findByLogin(String email);

    UserDto findByLoginAndPassword(UserRequest userRequest);

}
