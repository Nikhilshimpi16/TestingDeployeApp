package com.wnsProject.DTO;

import com.wnsProject.Entity.Consumer;

public class ConsumerReportDTO {
	
	    private String consumerNo;
	    private String consumerName;
	    private String addressLine1;
	    private String addressLine2;
	    private String mobileNo;
	    private String age;
	    private String businessOrJob;
	    private String dateOfTapConnected; // Change to String for flexibility in handling nulls
	    private String meterNo;
	    private String waterCourseName;
	    private String email;

	    // Constructor
	    public ConsumerReportDTO(Consumer consumer) {
	        this.consumerNo = consumer.getConsumerNo();
	        this.consumerName = consumer.getConsumerName();
	        this.addressLine1 = consumer.getAddressLine1();
	        this.addressLine2 = consumer.getAddressLine2();
	        this.mobileNo = consumer.getMobileNo();
	        this.age = consumer.getAge();
	        this.businessOrJob = consumer.getBusinessOrJob();
	        this.dateOfTapConnected = consumer.getDateOfTapConnected() != null 
	                                   ? consumer.getDateOfTapConnected().toString() 
	                                   : "N/A"; // Default value
	        this.meterNo = consumer.getMeterNo();
	        this.waterCourseName = consumer.getWaterCourseName();
	        this.email = consumer.getEmail();
	    }
	    
	    // Getters and Setters

		public String getConsumerNo() {
			return consumerNo;
		}

		public void setConsumerNo(String consumerNo) {
			this.consumerNo = consumerNo;
		}

		public String getConsumerName() {
			return consumerName;
		}

		public void setConsumerName(String consumerName) {
			this.consumerName = consumerName;
		}

		public String getAddressLine1() {
			return addressLine1;
		}

		public void setAddressLine1(String addressLine1) {
			this.addressLine1 = addressLine1;
		}

		public String getAddressLine2() {
			return addressLine2;
		}

		public void setAddressLine2(String addressLine2) {
			this.addressLine2 = addressLine2;
		}

		public String getMobileNo() {
			return mobileNo;
		}

		public void setMobileNo(String mobileNo) {
			this.mobileNo = mobileNo;
		}

		public String getAge() {
			return age;
		}

		public void setAge(String age) {
			this.age = age;
		}

		public String getBusinessOrJob() {
			return businessOrJob;
		}

		public void setBusinessOrJob(String businessOrJob) {
			this.businessOrJob = businessOrJob;
		}

		public String getDateOfTapConnected() {
			return dateOfTapConnected;
		}

		public void setDateOfTapConnected(String dateOfTapConnected) {
			this.dateOfTapConnected = dateOfTapConnected;
		}

		public String getMeterNo() {
			return meterNo;
		}

		public void setMeterNo(String meterNo) {
			this.meterNo = meterNo;
		}

		public String getWaterCourseName() {
			return waterCourseName;
		}

		public void setWaterCourseName(String waterCourseName) {
			this.waterCourseName = waterCourseName;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

	
	    
	    
	}



