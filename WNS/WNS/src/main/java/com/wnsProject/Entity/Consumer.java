package com.wnsProject.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.itextpdf.text.pdf.PdfPCell;
import com.wnsProject.Converter.PdfPCellConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ConsumerRegistration")
public class Consumer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	    @Column(unique = true)
	    private String consumerNo;  // Auto-generated

	    private String consumerName;
	    private String addressLine1;
	    private String addressLine2;
	    private String mobileNo;
	    
	    
	    private String  age;
	    private String businessOrJob;
	    
	    @JsonFormat(pattern = "yyyy-MM-dd")
	    private LocalDate dateOfTapConnected;
	    private String meterNo;  // Foreign key to MeterNoForm
	    private String waterCourseName;
	    private String email;
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
		public LocalDate getDateOfTapConnected() {
			return dateOfTapConnected;
		}
		public void setDateOfTapConnected(LocalDate dateOfTapConnected) {
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
		@Override
		public String toString() {
			return "Consumer [id=" + id + ", consumerNo=" + consumerNo + ", consumerName=" + consumerName
					+ ", addressLine1=" + addressLine1 + ", addressLine2=" + addressLine2 + ", mobileNo=" + mobileNo
					+ ", age=" + age + ", businessOrJob=" + businessOrJob + ", dateOfTapConnected=" + dateOfTapConnected
					+ ", meterNo=" + meterNo + ", waterCourseName=" + waterCourseName + ", email=" + email + "]";
		}
		public Consumer(Long id, String consumerNo, String consumerName, String addressLine1, String addressLine2,
				String mobileNo, String age, String businessOrJob, LocalDate dateOfTapConnected, String meterNo,
				String waterCourseName, String email) {
			super();
			this.id = id;
			this.consumerNo = consumerNo;
			this.consumerName = consumerName;
			this.addressLine1 = addressLine1;
			this.addressLine2 = addressLine2;
			this.mobileNo = mobileNo;
			this.age = age;
			this.businessOrJob = businessOrJob;
			this.dateOfTapConnected = dateOfTapConnected;
			this.meterNo = meterNo;
			this.waterCourseName = waterCourseName;
			this.email = email;
		}
		public Consumer() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
	    
	    


}
