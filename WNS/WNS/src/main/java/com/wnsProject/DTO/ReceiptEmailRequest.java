package com.wnsProject.DTO;

public class ReceiptEmailRequest {
    private String consumerNo;
    private String email;
    private double total;
    private double amountPaid;
    private double pendingBill;
    private String paymentMode;
	public String getConsumerNo() {
		return consumerNo;
	}
	public void setConsumerNo(String consumerNo) {
		this.consumerNo = consumerNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
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
	@Override
	public String toString() {
		return "ReceiptEmailRequest [consumerNo=" + consumerNo + ", email=" + email + ", total=" + total
				+ ", amountPaid=" + amountPaid + ", pendingBill=" + pendingBill + ", paymentMode=" + paymentMode + "]";
	}
	public ReceiptEmailRequest(String consumerNo, String email, double total, double amountPaid, double pendingBill,
			String paymentMode) {
		super();
		this.consumerNo = consumerNo;
		this.email = email;
		this.total = total;
		this.amountPaid = amountPaid;
		this.pendingBill = pendingBill;
		this.paymentMode = paymentMode;
	}
	public ReceiptEmailRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

    // Getters and Setters
    
    
    
}
