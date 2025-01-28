package com.wnsProject.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.DTO.PaymentDTO;
import com.wnsProject.Entity.Payment;
import com.wnsProject.Service.PaymentService;

@RestController
@RequestMapping("/api/reports")
public class PaymentReportController {
	
	  @Autowired
	    private PaymentService paymentService;
	
	@GetMapping("/filter")
    public ResponseEntity<List<Payment>> getFilteredPayments(
        @RequestParam(required = false) String consumerNo,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate
    ) {
        return ResponseEntity.ok(paymentService.getFilteredPayments(consumerNo, fromDate, toDate));
    }
	
	
	  @GetMapping("/all-payments")
	    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
	        return ResponseEntity.ok(paymentService.getAllPayments());
	    }
	  
	  @GetMapping("/paid-total")
	    public double getPaidTotalAmount() {
	        return paymentService.getPaidTotalAmount();
	    }

	    @GetMapping("/unpaid-total")
	    public double getUnpaidTotalAmount() {
	        return paymentService.getUnpaidTotalAmount();
	    }
	    

}
