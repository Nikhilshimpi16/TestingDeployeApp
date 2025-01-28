package com.wnsProject.DTO;

import java.time.LocalDate;

import jakarta.persistence.Column;

public class PaymentDTO {
	
	private String consumerNo;
    private String name;
    private double total;
    private double nowPaid;
    private double pendingBill;
    @Column(name = "bill_generated_date", nullable = false)
    private LocalDate billGeneratedDate;
    private LocalDate expiryDate;

    private String paymentMode;
    private String status;
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
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public double getNowPaid() {
		return nowPaid;
	}
	public void setNowPaid(double nowPaid) {
		this.nowPaid = nowPaid;
	}
	public double getPendingBill() {
		return pendingBill;
	}
	public void setPendingBill(double pendingBill) {
		this.pendingBill = pendingBill;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
		return "PaymentDTO [consumerNo=" + consumerNo + ", name=" + name + ", total=" + total + ", nowPaid=" + nowPaid
				+ ", pendingBill=" + pendingBill + ", billGeneratedDate=" + billGeneratedDate + ", expiryDate="
				+ expiryDate + ", paymentMode=" + paymentMode + ", status=" + status + "]";
	}
	 public PaymentDTO(String consumerNo, String consumerName, double totalBill, double nowPaid, 
             double pendingBill, String paymentMode, String status, 
            LocalDate billGeneratedDate, LocalDate expiryDate) {
		 	this.consumerNo = consumerNo;
		    this.name = consumerName;
		    this.total = totalBill;
		    this.nowPaid = nowPaid;
		    this.pendingBill = pendingBill;
		    this.paymentMode = paymentMode;
			this.status = status;
			this.billGeneratedDate = billGeneratedDate;
			this.expiryDate = expiryDate;
}
	public PaymentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    

}
