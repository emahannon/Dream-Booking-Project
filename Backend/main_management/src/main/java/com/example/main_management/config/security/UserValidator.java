package com.example.main_management.config.security;

import com.example.main_management.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public UserValidator(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;
        try {
            customUserDetailsService.loadUserByUsername(user.getEmail());
        } catch (UsernameNotFoundException ignored) {
            return;
        }
        errors.rejectValue("email", "500", "This email already exists");
    }
}
