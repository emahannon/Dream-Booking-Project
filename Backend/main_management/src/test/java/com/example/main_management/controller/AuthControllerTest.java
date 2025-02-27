package com.example.main_management.controller;

import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.UserRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDto validUser;
    private UserRequest validUserRequest;

    @BeforeEach
    public void setUp() {

        validUser = new UserDto();
        validUser.setName("Username");
        validUser.setSurname("Surname");
        validUser.setEmail("testuser@example.com");
        validUser.setPassword("password123");

        validUserRequest = new UserRequest("testuser@example.com", "password123");

    }

    @Test
    public void testSignup_Success() throws Exception {
        ResultActions resultActions = mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUser)));

        resultActions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));
    }


    @Test
    public void testSignup_EmailAlreadyExists() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUser)));

        ResultActions resultActions = mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUser)));

        resultActions
                .andExpect(status().isOk())
                .andExpect(content().string("This email already exists!"));
    }

    @Test
    public void testSignin_Success() throws Exception {

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUser)));


        ResultActions resultActions = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validUserRequest)));

        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("testuser@example.com"));
    }

    @Test
    public void testSignin_WrongCredentials() throws Exception {

        UserRequest invalidRequest = new UserRequest("wronguser@example.com", "wrongpassword");

        ResultActions resultActions = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)));

        resultActions
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Authentication failed: Bad credentials"));
    }

    @Test
    public void testSignin_MissingFields() throws Exception {

        UserRequest missingFieldsRequest = new UserRequest("testuser@example.com", null);

        ResultActions resultActions = mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(missingFieldsRequest)));

        resultActions
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Authentication failed: Bad credentials"));
    }
}