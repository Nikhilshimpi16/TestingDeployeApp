package com.wnsProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.DTO.PaymentReceipts;
import com.wnsProject.DTO.PaymentRequest;
import com.wnsProject.Entity.BillGenerated;
import com.wnsProject.Entity.Payment;
import com.wnsProject.Service.BillService;
import com.wnsProject.Service.PaymentService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for frontend
public class PaymentController {

	  @Autowired
	    private BillService billService;

	    @Autowired
	    private PaymentService paymentService;

		private Payment processedPayment;

//	    // Get Bill by Consumer No
//	    @GetMapping("/bills/consumer/{consumerNo}")
//	    public List<BillGenerated> getBillByConsumerNo(@PathVariable String consumerNo) {
//	        return billService.getBillByConsumerNo(consumerNo);
//	    }

	    // Post Payment and Generate Receipt
		 @PostMapping("/payments")
		    public ResponseEntity<?> processPayment(@RequestBody Payment payment) {
		        // Example: Calculate total_bill if not provided
		        if (payment.getTotalBill() == null) {
		            payment.setTotalBill(payment.getPendingBill() + payment.getNowPaid());
		        }

		        Payment savedPayment = paymentService.processPayment(payment);
		        return ResponseEntity.ok(savedPayment);
		    }
		 
		 @PostMapping("/pay")
		    public ResponseEntity<List<Payment>> processPayments(@RequestBody PaymentRequest paymentRequest) {
		        List<Payment> updatedPayments = paymentService.processPayment(paymentRequest);
		        return ResponseEntity.ok(updatedPayments);
		    }
		 
}
