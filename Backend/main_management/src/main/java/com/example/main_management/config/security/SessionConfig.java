package com.example.main_management.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;


@Configuration
public class SessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("JSESSIONID");
        serializer.setCookiePath("/");  // Cookie is available across the app
        serializer.setSameSite("None");  // Allow cross-origin requests
        serializer.setUseSecureCookie(false);  // Use true if you're running HTTPS
        return serializer;
    }
}
