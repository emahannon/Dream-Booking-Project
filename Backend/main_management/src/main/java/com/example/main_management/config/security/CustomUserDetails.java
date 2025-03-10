package com.example.main_management.config.security;


import com.example.main_management.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;

public class CustomUserDetails implements UserDetails {
    private Long id;

    private String login;
    private String password;

    private Collection<? extends GrantedAuthority> grantedAuthorities;
    private Date expirationDate;

    public static CustomUserDetails fromUserEntityToCustomUserDetails(User user) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.login = user.getEmail();
        customUserDetails.password = user.getPassword();
        customUserDetails.id = user.getId();
        customUserDetails.grantedAuthorities = Collections
                .singletonList(new SimpleGrantedAuthority("ROLE_"+user.getRole().getName()));
        return customUserDetails;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}