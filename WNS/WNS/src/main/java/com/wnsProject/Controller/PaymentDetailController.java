package com.wnsProject.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.DTO.PaymentDTO;
import com.wnsProject.Entity.Payment;
import com.wnsProject.Entity.PaymentDetail;
import com.wnsProject.Service.PaymentDetailService;
import com.wnsProject.Service.PaymentService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentDetailController {
	
	@Autowired
	private PaymentService paymentService;
	
	
	  @GetMapping("/paid-payments")
	    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
	        List<PaymentDTO> payments = paymentService.getAllPayments();
	        return ResponseEntity.ok(payments);
	    }
	  


}
