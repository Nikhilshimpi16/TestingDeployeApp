package com.wnsProject.Controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.wnsProject.DTO.LoginRequest;
import com.wnsProject.DTO.ResponceMessage;
import com.wnsProject.Entity.RegistrationForm;
import com.wnsProject.Service.EmailService;
import com.wnsProject.Service.PaymentService;
import com.wnsProject.Serviceiml.RegisterServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.security.Principal;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {
    
    @Autowired
    private EmailService emailservice;
    
  @Autowired
  private RegisterServiceImpl registerservice;
    

    @Autowired
   private PasswordEncoder passwordEncoder;
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=<>?";

    @PostMapping("/registrations")
    public ResponseEntity<?> register(@RequestBody RegistrationForm register) {
    	
    	 // Validate duplicates
        String validationResult = registerservice.validateRegistration(register);
        if (!validationResult.equals("Valid")) {
            return ResponseEntity.badRequest().body(validationResult);
        }
        // Generate username from first and last names
        String username = register.getFirstName().toLowerCase() + register.getLastName().toLowerCase();  
        // Generate a random password
        String password = generateRandomPassword(10); // Desired length
        
        // Set the generated password in the RegistrationForm (assuming you have a setPassword method)
        register.setPassword(password);
        
        // Save registration data
        registerservice.save(register);
        
        // Prepare and send email
        String subject = "Registration Successful";
        String body = "Your username: " + username + "\nYour Password: " + password;
        emailservice.sendEmail(register.getEmail(), subject, body);
        
        return ResponseEntity.ok(register);
    }

    private String generateRandomPassword(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);
        
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(index));
        }
        
        return password.toString();
    }
    

    @GetMapping("/registrationCount")
    public long getRegistrationCount() {
        return registerservice.getRegistrationCount();
    }
    
    
    // report update API
    @PutMapping("/report/registration/{id}")
    public ResponseEntity<RegistrationForm> updateUser(@PathVariable Long id, @RequestBody RegistrationForm register) {
        RegistrationForm updatedUser = registerservice.updateuser(id, register);
        return ResponseEntity.ok(register);
    }  

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        RegistrationForm user = registerservice.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("email", user.getEmail());
            response.put("name", user.getFirstName());
            response.put("avatar", user.getAvatarUrl());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false));
    }
    
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        RegistrationForm user = registerservice.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
//        if (user != null) {
//            return ResponseEntity.ok(new ResponceMessage("Login successful", true));
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponceMessage("Invalid email or password", false));
//    }
    
	   // Update password endpoint
    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordUpdateRequest request) {
        String email = request.getEmail();
        String currentPassword = request.getCurrentPassword();
        String newPassword = request.getNewPassword();
        try {
            registerservice.updatePassword(email, currentPassword, newPassword);
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
    
    
  
    
    
   
       // logout 
    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Check if session exists
        if (session != null) {
            session.invalidate(); // Invalidate the session
        }
        return "Logout successful";
    }

  
    
    
}

