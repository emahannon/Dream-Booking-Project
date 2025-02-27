package com.example.main_management.services.impl;

import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.UserRequest;
import com.example.main_management.dto.mapper.UserMapper;
import com.example.main_management.entity.Role;
import com.example.main_management.entity.User;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.RoleRepository;
import com.example.main_management.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private Role userRole;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userRole = new Role();
        userRole.setName("USER");
    }

    @Test
    void create_shouldSaveUserSuccessfully() {
        User user = new User();
        user.setName("Test User");

        when(roleRepository.findByName("USER")).thenReturn(userRole);
        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.create(user);

        assertNotNull(createdUser);
        assertEquals(userRole, createdUser.getRole());
        verify(roleRepository, times(1)).findByName("USER");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void create_shouldThrowIllegalStateException_whenDataIntegrityViolationOccurs() {
        User user = new User();
        user.setName("Test User");

        when(roleRepository.findByName("USER")).thenReturn(userRole);
        when(userRepository.save(user)).thenThrow(new DataIntegrityViolationException("Constraint violation"));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> userService.create(user));

        assertEquals("Database constraint violation occurred while saving the user", exception.getMessage());
        verify(roleRepository, times(1)).findByName("USER");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void create_shouldThrowIllegalStateException_whenJpaSystemExceptionOccurs() {
        User user = new User();
        user.setName("Test User");

        when(roleRepository.findByName("USER")).thenReturn(userRole);
        when(userRepository.save(user)).thenThrow(new JpaSystemException(new RuntimeException("System error")));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> userService.create(user));

        assertEquals("Database system error occurred while saving the user", exception.getMessage());
        verify(roleRepository, times(1)).findByName("USER");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void create_shouldThrowIllegalStateException_whenUnexpectedErrorOccurs() {
        User user = new User();
        user.setName("Test User");

        when(roleRepository.findByName("USER")).thenReturn(userRole);
        when(userRepository.save(user)).thenThrow(new RuntimeException("Unexpected error"));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> userService.create(user));

        assertEquals("Unexpected error occurred while saving the user", exception.getMessage());
        verify(roleRepository, times(1)).findByName("USER");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void create_shouldThrowNullPointerException_whenUserIsNull() {
        NullPointerException exception = assertThrows(NullPointerException.class, () -> userService.create(null));
        assertEquals("User cannot be null", exception.getMessage());
        verifyNoInteractions(roleRepository, userRepository);
    }

    @Test
    void readById_shouldReturnUserDto_whenUserExists() {
        long userId = 1L;
        User user = new User();
        user.setId(userId);
        user.setName("Test User");

        UserDto userDto = new UserDto();
        userDto.setId(userId);
        userDto.setName("Test User");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        UserMapper.convertToDto(user);

        UserDto result = userService.readById(userId);

        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("Test User", result.getName());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void readById_shouldThrowEntityNotFoundException_whenUserDoesNotExist() {
        long userId = 1L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> userService.readById(userId));

        assertEquals("User with id " + userId + " not found", exception.getMessage());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void update_shouldUpdateUserSuccessfully() {

        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setName("Old Name");

        UserDto existingUserDto = new UserDto();
        existingUserDto.setId(1L);
        existingUserDto.setName("Old Name");

        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setName("New Name");
        updatedUser.setSurname("New Surname");
        updatedUser.setPhone("123456789");
        updatedUser.setBirthday(LocalDate.parse("2000-01-01"));

        User updatedUserInRepo = new User();
        updatedUserInRepo.setId(1L);
        updatedUserInRepo.setName("New Name");
        updatedUserInRepo.setSurname("New Surname");
        updatedUserInRepo.setPhone("123456789");
        updatedUserInRepo.setBirthday(LocalDate.parse("2000-01-01"));


        try (MockedStatic<UserMapper> mockedMapper = Mockito.mockStatic(UserMapper.class)) {
            when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
            mockedMapper.when(() -> UserMapper.convertToDto(existingUser)).thenReturn(existingUserDto);
            mockedMapper.when(() -> UserMapper.convertToEntity(existingUserDto)).thenReturn(existingUser);
            when(userRepository.save(existingUser)).thenReturn(updatedUserInRepo);


            User result = userService.update(updatedUser);


            assertNotNull(result);
            assertEquals("New Name", result.getName());
            assertEquals("New Surname", result.getSurname());
            assertEquals("123456789", result.getPhone());
            assertEquals(LocalDate.parse("2000-01-01"), result.getBirthday());
        }

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(existingUser);
    }



    @Test
    void update_shouldThrowNullEntityReferenceException_whenUserIsNull() {
        NullEntityReferenceException exception = assertThrows(NullEntityReferenceException.class, () -> userService.update(null));
        assertEquals("User cannot be 'null'", exception.getMessage());
        verifyNoInteractions(userRepository);
    }
    @Test
    void update_shouldThrowEntityNotFoundException_whenUserDoesNotExist() {

        User userToUpdate = new User();
        userToUpdate.setId(999L);
        userToUpdate.setName("Nonexistent User");
        when(userRepository.findById(999L)).thenReturn(Optional.empty());
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> userService.update(userToUpdate));
        assertEquals("User with id 999 not found", exception.getMessage());
        verify(userRepository, times(1)).findById(999L);
        verify(userRepository, times(0)).save(any());
    }
    @Test
    void findByLogin_shouldReturnUser_whenEmailExists() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<User> result = userService.findByLogin(email);

        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void findByLogin_shouldThrowException_whenEmailIsBlank() {

        String email = "";

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> userService.findByLogin(email));

        assertEquals("User not found", exception.getMessage());
        verifyNoInteractions(userRepository);
    }

    @Test
    void findByLogin_shouldReturnEmptyOptional_whenEmailDoesNotExist() {

        String email = "nonexistent@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        Optional<User> result = userService.findByLogin(email);

        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findByEmail(email);
    }


    @Test
    void findByLoginAndPassword_shouldReturnUserDto_whenCredentialsAreValid() {

        String email = "test@example.com";
        String password = "12345";
        String encodedPassword = "$2a$12$A4QGlQhWoVeLSXNs6LQO6.KFdq3KXDkYFfBWX8BZEj1zVYU5Cyu2K"; // Encoded password

        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);

        UserRequest userRequest = new UserRequest(email, password);

        UserDto userDto = new UserDto();
        userDto.setEmail(email);


        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, encodedPassword)).thenReturn(true);


        try (MockedStatic<UserMapper> mockedMapper = Mockito.mockStatic(UserMapper.class)) {

            mockedMapper.when(() -> UserMapper.convertToDto(user)).thenReturn(userDto);

            UserDto result = userService.findByLoginAndPassword(userRequest);

            assertNotNull(result, "The result should not be null");
            assertEquals(email, result.getEmail(), "The email in the result should match the input email");

            mockedMapper.verify(() -> UserMapper.convertToDto(user), times(1));
        }

        verify(userRepository, times(1)).findByEmail(email); // Ensure findByEmail was called once

        verifyNoMoreInteractions(userRepository, passwordEncoder);
    }




}