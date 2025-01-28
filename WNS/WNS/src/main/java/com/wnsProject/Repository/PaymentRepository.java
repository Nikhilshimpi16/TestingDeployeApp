package com.wnsProject.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.Consumer;
import com.wnsProject.Entity.Payment;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
    List<Payment> findAllByOrderByPaymentDateDesc();

    List<Payment> findByConsumerNo(String consumerNo);
    List<Payment> findByBillGeneratedDateBetween(LocalDate startDate, LocalDate endDate);
    List<Payment> findByConsumerNoAndBillGeneratedDateBetween(String consumerNo, LocalDate fromDate, LocalDate toDate);

    Payment findTopByConsumerNoOrderByPaymentDateDesc(String consumerNo);
    
    @Query("SELECT SUM(p.nowPaid) FROM Payment p WHERE p.pendingBill = 0")
    double sumPaidAmount();

    @Query("SELECT SUM(p.pendingBill) FROM Payment p WHERE p.pendingBill > 0")
    Double sumUnpaidAmount();
    
  
}
