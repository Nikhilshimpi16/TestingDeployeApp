
package com.wnsProject.DTO;

import java.sql.Date;
import java.time.LocalDate;

public class PaymentReceipts {
	
	private String receiptId;
    private String consumerNo;
    private String name;
    private String email;
    private double total; 
    private double nowPaid;
    private String paymentMode;
    private String date;
	public String getReceiptId() {
		return receiptId;
	}
	public void setReceiptId(String receiptId) {
		this.receiptId = receiptId;
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
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "PaymentReceipts [receiptId=" + receiptId + ", consumerNo=" + consumerNo + ", name=" + name + ", email="
				+ email + ", total=" + total + ", nowPaid=" + nowPaid + ", paymentMode=" + paymentMode + ", date="
				+ date + "]";
	}
	
	
	
	public PaymentReceipts(String receiptId, String consumerNo, String name, String email, double total, double nowPaid,
			String paymentMode, String date) {
		super();
		this.receiptId = receiptId;
		this.consumerNo = consumerNo;
		this.name = name;
		this.email = email;
		this.total = total;
		this.nowPaid = nowPaid;
		this.paymentMode = paymentMode;
		this.date = date;
	}
	public PaymentReceipts() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
    
}
		