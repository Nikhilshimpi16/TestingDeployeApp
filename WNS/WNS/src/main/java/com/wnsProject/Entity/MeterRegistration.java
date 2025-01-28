package com.wnsProject.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="MeterRegNo")
public class MeterRegistration {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	    private String meterCompanyName;
	    private String meterNo;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getMeterCompanyName() {
			return meterCompanyName;
		}
		public void setMeterCompanyName(String meterCompanyName) {
			this.meterCompanyName = meterCompanyName;
		}
		public String getMeterNo() {
			return meterNo;
		}
		public void setMeterNo(String meterNo) {
			this.meterNo = meterNo;
		}
		@Override
		public String toString() {
			return "MeterRegistration [id=" + id + ", meterCompanyName=" + meterCompanyName + ", meterNo=" + meterNo
					+ "]";
		}
		public MeterRegistration(Long id, String meterCompanyName, String meterNo) {
			super();
			this.id = id;
			this.meterCompanyName = meterCompanyName;
			this.meterNo = meterNo;
		}
		public MeterRegistration() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
	    
	    


}
