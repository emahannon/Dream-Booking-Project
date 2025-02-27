package com.example.main_management.controller;

import com.example.main_management.config.security.UserValidator;
import com.example.main_management.dto.MessageResponse;
import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.UserRequest;
import com.example.main_management.dto.mapper.UserMapper;
import com.example.main_management.dto.mapper.UserResponse;
import com.example.main_management.entity.User;
import com.example.main_management.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    UserService userService;

     @Autowired
     UserValidator userValidator;

    @Autowired
    private AuthenticationManager authenticationManager;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody UserRequest userRequest, BindingResult result, HttpServletRequest request) {
        try {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userRequest.getEmail(),
                            userRequest.getPassword()
                    )
            );


            SecurityContextHolder.getContext().setAuthentication(authentication);

            HttpSession session = request.getSession();
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

            UserDto userResponse = userService.findByLoginAndPassword(userRequest);


            if (userResponse == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong email or password!");
            }

            UserResponse userResponse1 = new UserResponse(userResponse);
            return ResponseEntity.ok(userResponse1);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + ex.getMessage());
        }
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Valid @RequestBody UserDto userDto, BindingResult result) {
        User user = UserMapper.convertToEntity(userDto);
        userValidator.validate(user, result);
        if(result.hasErrors()){
            return ResponseEntity.ok("This email already exists!");
        }
        try {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            User newUser = userService.create(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while registering the user: " + e.getMessage());
        }

    }

}