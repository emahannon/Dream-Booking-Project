package com.example.main_management.services.impl;

import com.example.main_management.dto.UserDto;
import com.example.main_management.dto.UserRequest;
import com.example.main_management.dto.mapper.UserMapper;
import com.example.main_management.entity.Role;
import com.example.main_management.entity.User;
import com.example.main_management.exception.NullEntityReferenceException;
import com.example.main_management.repository.RoleRepository;
import com.example.main_management.repository.UserRepository;
import com.example.main_management.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User create(User user) {
        Objects.requireNonNull(user, "User cannot be null");

        Role userRole = roleRepository.findByName("USER");
        user.setRole(userRole);

        try {
            return userRepository.save(user);
        } catch (RuntimeException e) {
            if (e instanceof DataIntegrityViolationException) {
                throw new IllegalStateException("Database constraint violation occurred while saving the user", e);
            } else if (e instanceof JpaSystemException) {
                throw new IllegalStateException("Database system error occurred while saving the user", e);
            } else {
                throw new IllegalStateException("Unexpected error occurred while saving the user", e);
            }
        }
    }

    @Override
    public UserDto readById(long id) {
        return userRepository.findById(id).map(UserMapper::convertToDto).orElseThrow(
                () -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public User update(User user) {
        if (user != null) {
            UserDto userDto = readById(user.getId());
            final User userUpdated = UserMapper.convertToEntity(userDto);
            userUpdated.setName(user.getName());
            userUpdated.setSurname(user.getSurname());
            userUpdated.setPhone(user.getPhone());
            userUpdated.setBirthday(user.getBirthday());
            return userRepository.save(userUpdated);
        }
        throw new NullEntityReferenceException("User cannot be 'null'");
    }

    @Override
    public Optional<User> findByLogin(String email) {
        if(!email.isBlank()){
            return userRepository.findByEmail(email);}
        else {
            throw new EntityNotFoundException("User not found");
        }
    }

    @Override
    public UserDto findByLoginAndPassword(UserRequest userRequest) {
        return userRepository.findByEmail(userRequest.getEmail())
                .filter(user -> passwordEncoder.matches(userRequest.getPassword(), user.getPassword()))
                .map(UserMapper::convertToDto)
                .orElse(null);
    }
}


