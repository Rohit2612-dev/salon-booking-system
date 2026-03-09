package com.example.salon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())   // Disable CSRF for testing
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/services/**").permitAll()
                .requestMatchers("/api/bookings/**").permitAll() 
                .requestMatchers("/api/staff/**").permitAll()
                .anyRequest().permitAll()  // Allow everything for now (development mode)
            );

        return http.build();
    }
}
