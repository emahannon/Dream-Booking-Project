package com.example.main_management.controller;


import com.example.main_management.config.security.CustomUserDetails;
import com.example.main_management.config.security.UserValidator;
import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.mapper.UserMapper;
import com.example.main_management.dto.mapper.UserResponse;
import com.example.main_management.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserValidator userValidator;


    @PostMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody UserDto userDto, BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = result.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                            FieldError::getField,
                            FieldError::getDefaultMessage
                    ));
            return ResponseEntity.badRequest().body(errors);
        }


        UserDto oldUser = userService.readById(getCurrentUser());
        userService.update(UserMapper.convertToEntity(userDto));

        return ResponseEntity.ok("User updated successfully!!");
    }

    @GetMapping("/getInfo")
    public ResponseEntity<?> getUser() {
        UserDto user = userService.readById(getCurrentUser());
        UserResponse userResponse = new UserResponse(user);
            return ResponseEntity.ok(userResponse);
        }


    public Long getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return ((CustomUserDetails) authentication.getPrincipal()).getId();
        }
        return null;
    }


}
