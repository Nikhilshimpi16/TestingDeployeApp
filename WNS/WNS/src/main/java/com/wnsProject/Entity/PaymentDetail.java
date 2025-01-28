package com.wnsProject.Entity;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="payment_Details")
public class PaymentDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String ConsumerNo;
	
	private String  ConsumerName;
	
	private String City;
	
	@Column(name="paid_date")
	private LocalDate paideDate;
	
	@Column(name="paid_amount")
	private Double paidAmount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConsumerNo() {
		return ConsumerNo;
	}

	public void setConsumerNo(String consumerNo) {
		ConsumerNo = consumerNo;
	}

	public String getConsumerName() {
		return ConsumerName;
	}

	public void setConsumerName(String consumerName) {
		ConsumerName = consumerName;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public LocalDate getPaideDate() {
		return paideDate;
	}

	public void setPaideDate(LocalDate paideDate) {
		this.paideDate = paideDate;
	}

	public Double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(Double paidAmount) {
		this.paidAmount = paidAmount;
	}

	@Override
	public String toString() {
		return "PaymentDetail [id=" + id + ", ConsumerNo=" + ConsumerNo + ", ConsumerName=" + ConsumerName + ", City="
				+ City + ", paideDate=" + paideDate + ", paidAmount=" + paidAmount + "]";
	}

	public PaymentDetail(Long id, String consumerNo, String consumerName, String city, LocalDate paideDate,
			Double paidAmount) {
		super();
		this.id = id;
		ConsumerNo = consumerNo;
		ConsumerName = consumerName;
		City = city;
		this.paideDate = paideDate;
		this.paidAmount = paidAmount;
	}

	public PaymentDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
