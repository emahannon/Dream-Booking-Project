package com.example.main_management.controller;

import com.example.main_management.config.security.CustomUserDetails;
import com.example.main_management.dto.UserDto;
import com.example.main_management.services.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;


    @BeforeEach
    public void setUpSecurityContext() {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(1L);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                customUserDetails,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    public void testGetUser_Success() throws Exception {
        UserDto userDto = userService.readById(1L);

        mockMvc.perform(get("/api/user/getInfo")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(userDto.getEmail()))
                .andExpect(jsonPath("$.name").value(userDto.getName()))
                .andExpect(jsonPath("$.surname").value(userDto.getSurname()));

    }

    @Test
    @Transactional
    public void testUpdateUser_Success() throws Exception {

        String updatedUserJson = """
                    {
                        "id": 1,
                                  "name": "John",
                                  "surname": "Doe",
                                  "email": "johndoe@gmail.com",
                                  "phone": "+420-456-789-23",
                                  "birthday": "2000-01-20"
                    }
                """;

        mockMvc.perform(post("/api/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedUserJson))
                .andExpect(status().isOk())
                .andExpect(content().string("User updated successfully!!"));

        UserDto updatedUser = userService.readById(1L);
        assertEquals("John", updatedUser.getName());
        assertEquals("Doe", updatedUser.getSurname());
        assertEquals("+420-456-789-23", updatedUser.getPhone());
    }

    @Test
    @Transactional
    public void testUpdateUser_ValidationFailure() throws Exception {

        String invalidUserJson = """
            { 
                "id": "1",
                "email": "johndoe@gmail.com",
                "name": "",
                "surname": ""
            }
        """;

        mockMvc.perform(post("/api/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidUserJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name").value("Must start with a capital letter followed by one or more lowercase letters"))
                .andExpect(jsonPath("$.surname").value("Must start with a capital letter followed by one or more lowercase letters"));
    }

    @Test
    public void testGetUser_Unauthenticated() throws Exception {

        mockMvc.perform(get("/api/auth/logout"));

        mockMvc.perform(get("/api/user/getInfo")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

}