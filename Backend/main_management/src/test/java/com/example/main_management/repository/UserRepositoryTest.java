package com.example.main_management.repository;

import com.example.main_management.entity.User;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private Flyway flyway;

    @BeforeEach
    public void setUp() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    public void findByEmail_ShouldReturnUser() {
        Optional<User> user = userRepository.findByEmail("johndoe@gmail.com");
        assertTrue(user.isPresent());
        assertEquals("John", user.get().getName());
    }

    @Test
    void findById_ShouldReturnUser_WhenUserExists() {

        Optional<User> result = userRepository.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        assertEquals("johndoe@gmail.com", result.get().getEmail());
    }


    @Test
    void findById_ShouldReturnEmptyOptional_WhenUserDoesNotExist() {
        Optional<User> result = userRepository.findById(999L);
        assertFalse(result.isPresent(), "Expected an empty Optional, but got a value.");
    }


    @Test
    public void save_ShouldPersistUser() {
        User newUser = new User();
        newUser.setName("Alice");
        newUser.setPassword("12345");
        newUser.setSurname("Wonderland");
        newUser.setEmail("alice@example.com");
        newUser.setRole(roleRepository.findByName("USER"));
        User savedUser = userRepository.save(newUser);
        assertNotNull(savedUser.getId());
        assertEquals("Alice", savedUser.getName());
    }


}