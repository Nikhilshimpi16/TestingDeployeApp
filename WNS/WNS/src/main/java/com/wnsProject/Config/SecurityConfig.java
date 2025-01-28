package com.wnsProject.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

	import org.springframework.context.annotation.Configuration;
	import org.springframework.security.config.annotation.web.builders.HttpSecurity;
	import org.springframework.security.web.SecurityFilterChain;


	    @Configuration
	    public class SecurityConfig {

	        @Bean
	        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	            http
	                .cors().and().csrf().disable() // Enable CORS and disable CSRF if necessary
	                .authorizeRequests()
	                //    .requestMatchers("/api/dashboard/stats" ).authenticated() // Require authentication for stats endpoint
	                    .requestMatchers( "/api/updatePassword","/api/registrationCount").permitAll()
	                    .requestMatchers("/api/login").permitAll()  // Allow login endpoint without authentication
	                    .requestMatchers("/api/employees/login").permitAll()
	                   // .requestMatchers("/api/employeeregister").permitAll()  // Allow login endpoint without authentication
	                    .anyRequest().permitAll() // Permit other requests as needed
	                .and()
	                .formLogin()
	                    .defaultSuccessUrl("/dashboard", true); // Customize login success URL

	            return http.build();
	        }


	        @Bean
	        public PasswordEncoder passwordEncoder() {
	            return new BCryptPasswordEncoder();
	        }
    }

