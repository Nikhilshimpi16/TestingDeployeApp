package com.wnsProject.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.DTO.PaymentReceipts;
import com.wnsProject.DTO.ReceiptEmailRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
	
	
	@PostMapping("/send-receipt-email")
    public ResponseEntity<String> sendReceiptEmail(@RequestBody PaymentReceipts request) {
        // Implement email sending logic using JavaMailSender or other email libraries
        // Use the data from `request` to construct the email content
        try {
            // Email sending logic here
            return ResponseEntity.ok("Receipt email sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send receipt email.");
        }
    }

}
