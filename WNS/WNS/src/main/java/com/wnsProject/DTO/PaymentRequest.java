package com.wnsProject.DTO;

	
	public class PaymentRequest {
	    private String consumerNo;
	    private double paymentAmount;
		public String getConsumerNo() {
			return consumerNo;
		}
		public void setConsumerNo(String consumerNo) {
			this.consumerNo = consumerNo;
		}
		public double getPaymentAmount() {
			return paymentAmount;
		}
		public void setPaymentAmount(double paymentAmount) {
			this.paymentAmount = paymentAmount;
		}
		@Override
		public String toString() {
			return "PaymentRequest [consumerNo=" + consumerNo + ", paymentAmount=" + paymentAmount + "]";
		}
		public PaymentRequest(String consumerNo, double paymentAmount) {
			super();
			this.consumerNo = consumerNo;
			this.paymentAmount = paymentAmount;
		}
		public PaymentRequest() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
	    
	    // Getters and Setters
	}



