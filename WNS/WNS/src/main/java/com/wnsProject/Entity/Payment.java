package com.wnsProject.Entity;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="payment")
public class Payment {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String consumerNo;
	    private String name;
	    private Double totalBill;
	    private Double nowPaid;
	    private Double pendingBill;
	    @Column(name = "bill_generated_date", nullable = false)
	    private LocalDate billGeneratedDate;
	    private LocalDate expiryDate;

	    private String paymentMode;
	    private LocalDate paymentDate;
	    private String  paymentId;
	    private Double amount;
	    private String status; 
	    
	    
	    
		public Double getAmount() {
			return amount;
		}
		public void setAmount(Double amount) {
			this.amount = amount;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getConsumerNo() {
			return consumerNo;
		}
		public void setConsumerNo(String consumerNo) {
			this.consumerNo = consumerNo;
		}
		
	
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Double getTotalBill() {
			return totalBill;
		}
		public void setTotalBill(Double totalBill) {
			this.totalBill = totalBill;
		}
		public Double getNowPaid() {
			return nowPaid;
		}
		public void setNowPaid(Double nowPaid) {
			this.nowPaid = nowPaid;
		}
		public Double getPendingBill() {
			return pendingBill;
		}
		public void setPendingBill(Double pendingBill) {
			this.pendingBill = pendingBill;
		}
		public String getPaymentMode() {
			return paymentMode;
		}
		public void setPaymentMode(String paymentMode) {
			this.paymentMode = paymentMode;
		}
		public LocalDate getPaymentDate() {
			return paymentDate;
		}
		public void setPaymentDate(LocalDate date) {
			this.paymentDate = date;
		}
		
		
		public String getPaymentId() {
			return paymentId;
		}
		public void setPaymentId(String paymentId) {
			this.paymentId = paymentId;
		}
			
		
		public LocalDate getBillGeneratedDate() {
			return billGeneratedDate;
		}
		public void setBillGeneratedDate(LocalDate billGeneratedDate) {
			this.billGeneratedDate = billGeneratedDate;
		}
		
		
		public LocalDate getExpiryDate() {
			return expiryDate;
		}
		public void setExpiryDate(LocalDate expiryDate) {
			this.expiryDate = expiryDate;
		}
		
		
		
		
		@Override
		public String toString() {
			return "Payment [id=" + id + ", consumerNo=" + consumerNo + ", name=" + name + ", totalBill=" + totalBill
					+ ", nowPaid=" + nowPaid + ", pendingBill=" + pendingBill + ", billGeneratedDate="
					+ billGeneratedDate + ", expiryDate=" + expiryDate + ", paymentMode=" + paymentMode
					+ ", paymentDate=" + paymentDate + ", paymentId=" + paymentId + ", amount=" + amount + ", status="
					+ status + "]";
		}
		
		
		
		public Payment(Long id, String consumerNo, String name, Double totalBill, Double nowPaid, Double pendingBill,
				LocalDate billGeneratedDate, LocalDate expiryDate, String paymentMode, LocalDate paymentDate,
				String paymentId, Double amount, String status) {
			super();
			this.id = id;
			this.consumerNo = consumerNo;
			this.name = name;
			this.totalBill = totalBill;
			this.nowPaid = nowPaid;
			this.pendingBill = pendingBill;
			this.billGeneratedDate = billGeneratedDate;
			this.expiryDate = expiryDate;
			this.paymentMode = paymentMode;
			this.paymentDate = paymentDate;
			this.paymentId = paymentId;
			this.amount = amount;
			this.status = status;
		}
		public Payment() {
			super();
			// TODO Auto-generated constructor stub
		}
		public void setStatus(Object object) {
			// TODO Auto-generated method stub
			
		}
	
	    
	    
	    
}
