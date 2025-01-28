package com.wnsProject.Serviceiml;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.wnsProject.DTO.PaymentDTO;
import com.wnsProject.DTO.PaymentReceipts;
import com.wnsProject.DTO.PaymentRequest;
import com.wnsProject.Entity.Consumer;
import com.wnsProject.Entity.Payment;
import com.wnsProject.Repository.ConsumerRepository;
import com.wnsProject.Repository.PaymentRepository;
import com.wnsProject.Service.PaymentService;

@Service
public class PaymentSeviceImpl implements PaymentService {

	@Autowired
	  private PaymentRepository paymentRepository;
	
	@Autowired
	private ConsumerRepository consumerRepository;

	@Override
	public Payment processPayment(Payment payment) {
		return paymentRepository.save(payment);
	}

	@Override
	public List<PaymentDTO> getAllPayments() {
	    return paymentRepository.findAll()
	        .stream()
	        .map(payment -> {
	            Consumer consumer = consumerRepository.findByConsumerNo(payment.getConsumerNo())
	                                .orElse(null);
	            return new PaymentDTO(
	                payment.getConsumerNo(),
	                consumer != null ? consumer.getConsumerName() : "N/A",
	                payment.getTotalBill(),
	                payment.getNowPaid(),
	                payment.getPendingBill(),
	                payment.getPaymentMode(),
	                payment.getPendingBill() == 0 ? "Paid" : "Unpaid",
	                payment.getBillGeneratedDate(), // Include billGeneratedDate
	                payment.getExpiryDate() != null ? payment.getExpiryDate() : calculateExpiryDate(payment.getBillGeneratedDate())
	            );
	        })
	        .collect(Collectors.toList());
	}
	

	private LocalDate calculateExpiryDate(LocalDate billGeneratedDate) {
	    return LocalDate.from(billGeneratedDate.plusMonths(3));

	}

	@Override
	public List<Payment> processPayment(PaymentRequest paymentRequest) {
		// Fetch all bills for the consumer
		  List<Payment> bills = paymentRepository.findByConsumerNo(paymentRequest.getConsumerNo());
	        if (bills.isEmpty()) {
	            throw new RuntimeException("No bills found for the given consumer number");
	        }

	        double remainingAmount = paymentRequest.getPaymentAmount();

	        for (Payment bill : bills) {
	            if (remainingAmount <= 0) break;

	            double pending = bill.getPendingBill() != null ? bill.getPendingBill() : 0.0;

	            if (pending > 0) {
	                if (remainingAmount >= pending) {
	                    bill.setNowPaid(bill.getNowPaid() + pending);
	                    bill.setPendingBill(0.0); // Ensure not null
	                    bill.setStatus("Paid");
	                    remainingAmount -= pending;
	                } else {
	                    bill.setNowPaid(bill.getNowPaid() + remainingAmount);
	                    bill.setPendingBill(pending - remainingAmount);
	                    bill.setStatus("Unpaid");
	                    remainingAmount = 0;
	                }
	            }
	        }

	        return paymentRepository.saveAll(bills);
	    }

	public List<Payment> getFilteredPayments(String consumerNo, LocalDate fromDate, LocalDate toDate) {
        if (consumerNo != null && fromDate != null && toDate != null) {
            return paymentRepository.findByConsumerNoAndBillGeneratedDateBetween(consumerNo, fromDate, toDate);
        } else if (consumerNo != null) {
            return paymentRepository.findByConsumerNo(consumerNo);
        } else if (fromDate != null && toDate != null) {
            return paymentRepository.findByBillGeneratedDateBetween(fromDate, toDate);
        } else {
            return getAllPaymentsDate();
        }
    }
	

    public List<Payment> getAllPaymentsDate() {
        return paymentRepository.findAll();
    }

    public Payment getLastPaymentByConsumerNo(String consumerNo) {
        return paymentRepository.findTopByConsumerNoOrderByPaymentDateDesc(consumerNo);
    }
    
    public double getPaidTotalAmount() {
        return paymentRepository.sumPaidAmount();
    }

    public double getUnpaidTotalAmount() {
        // Retrieve the result from the repository
        Double unpaidAmount = paymentRepository.sumUnpaidAmount();
        
        // Check if the result is null, and return 0.0 if it is
        return (unpaidAmount != null) ? unpaidAmount : 0.0;
    }
	
//	public PaymentReceipts processPayment(PaymentReceipts paymentRequest) {
//        Payment payment = new Payment();
//        payment.setConsumerNo(paymentRequest.getConsumerNo());
//        payment.setTotalBill(paymentRequest.getTotalBill());
//        payment.setNowPaid(paymentRequest.getNowPaid());
//        payment.setPendingBill(paymentRequest.getPendingBill());
//        payment.setPaymentMode(paymentRequest.getPaymentMode());
//        payment.setPaymentDate(paymentRequest.getPaymentDate());
//
//        paymentRepository.save(payment);
//
//        PaymentReceipts receipt = new PaymentReceipts();
//        receipt.setPaymentMode(payment.getPaymentMode());
//        receipt.setTotalBill(payment.getTotalBill());
//        receipt.setNowPaid(payment.getNowPaid());
//        receipt.setPendingBill(payment.getPendingBill());
//        receipt.setPaymentDate(payment.getPaymentDate());
//        return receipt;
//    }

    
    


}