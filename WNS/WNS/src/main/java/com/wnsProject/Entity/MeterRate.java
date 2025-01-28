package com.wnsProject.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MeterRate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	private String unit; // e.g., "1"
    private Double price; // Price per unit
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "MeterRate [id=" + id + ", unit=" + unit + ", price=" + price + "]";
	}
	public MeterRate(Long id, String unit, Double price) {
		super();
		this.id = id;
		this.unit = unit;
		this.price = price;
	}
	public MeterRate() {
		super();
		// TODO Auto-generated constructor stub
	}

		
	    
	    
	    

}
