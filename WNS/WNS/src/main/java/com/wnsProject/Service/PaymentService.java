package com.wnsProject.Service;

import java.time.LocalDate;
import java.util.List;

import com.wnsProject.DTO.PaymentDTO;
import com.wnsProject.DTO.PaymentReceipts;
import com.wnsProject.DTO.PaymentRequest;
import com.wnsProject.Entity.Payment;

public interface PaymentService {
	

	Payment processPayment(Payment payment);
	
	 public List<PaymentDTO> getAllPayments();

	List<Payment> processPayment(PaymentRequest paymentRequest);
	public List<Payment> getFilteredPayments(String consumerNo, LocalDate fromDate, LocalDate toDate);
	 public Payment getLastPaymentByConsumerNo(String consumerNo);
	 public double getPaidTotalAmount();
	 public double getUnpaidTotalAmount();


}
