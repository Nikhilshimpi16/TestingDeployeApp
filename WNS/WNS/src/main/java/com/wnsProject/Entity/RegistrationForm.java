package com.wnsProject.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;


@Entity
@Table(name = "registrationform", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email" , "mobile_no"})
})
public class RegistrationForm {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String firstName;
	    private String lastName;
	    private String address;
	    private String taluka;
	    private String district;
	    private String postalCode;
	    private String state; 
	    
	    @Column(nullable = false, unique = true)
	    @Email(message = "Invalid email format")
	    private String email;
	    
	    @Column(nullable = false, unique = true)
	    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
	    private String mobileNo;
	    
	    private String subscription;
	    private String startDate;
	    private String endDate;
	    private String avatarUrl; // Add this field for avatar storage

	    
	    @Column(nullable = false)
	    private String password; // Add this field

		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getTaluka() {
			return taluka;
		}
		public void setTaluka(String taluka) {
			this.taluka = taluka;
		}
		public String getDistrict() {
			return district;
		}
		public void setDistrict(String district) {
			this.district = district;
		}
		public String getPostalCode() {
			return postalCode;
		}
		public void setPostalCode(String postalCode) {
			this.postalCode = postalCode;
		}
		public String getState() {
			return state;
		}
		public void setState(String state) {
			this.state = state;
		}
		public String getMobileNo() {
			return mobileNo;
		}
		public void setMobileNo(String mobileNo) {
			this.mobileNo = mobileNo;
		}
		public String getSubscription() {
			return subscription;
		}
		public void setSubscription(String subscription) {
			this.subscription = subscription;
		}
		public String getStartDate() {
			return startDate;
		}
		public void setStartDate(String startDate) {
			this.startDate = startDate;
		}
		public String getEndDate() {
			return endDate;
		}
		public void setEndDate(String endDate) {
			this.endDate = endDate;
		}
		
		 public String getPassword() {
		        return password;
		    }

		    public void setPassword(String password) {
		        this.password = password;
		    }
		
		
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
			
		public String getAvatarUrl() {
			return avatarUrl;
		}
		public void setAvatarUrl(String avatarUrl) {
			this.avatarUrl = avatarUrl;
		}
		@Override
		public String toString() {
			return "RegistrationForm [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", address="
					+ address + ", taluka=" + taluka + ", district=" + district + ", postalCode=" + postalCode
					+ ", state=" + state + ", email=" + email + ", mobileNo=" + mobileNo + ", subscription="
					+ subscription + ", startDate=" + startDate + ", endDate=" + endDate + ", password=" + password
					+ "]";
		}
		public RegistrationForm(Long id, String firstName, String lastName, String address, String taluka,
				String district, String postalCode, String state, String email, String mobileNo, String subscription,
				String startDate, String endDate, String password) {
			super();
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.address = address;
			this.taluka = taluka;
			this.district = district;
			this.postalCode = postalCode;
			this.state = state;
			this.email = email;
			this.mobileNo = mobileNo;
			this.subscription = subscription;
			this.startDate = startDate;
			this.endDate = endDate;
			this.password = password;
		}
		public RegistrationForm() {
			super();
			// TODO Auto-generated constructor stub
		}
	
		public boolean isPresent() {
			// TODO Auto-generated method stub
			return true;
		}
	
		public static void save(RegistrationForm user) {
			// TODO Auto-generated method stub
			
		}
	
		public RegistrationForm orElseThrow(Object object) {
			// TODO Auto-generated method stub
			return null;
		}

   
	    
}
