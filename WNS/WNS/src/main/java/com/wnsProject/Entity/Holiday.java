package com.wnsProject.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Holiday {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    private String holidayName;
	    private LocalDate holidayDate;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getHolidayName() {
			return holidayName;
		}
		public void setHolidayName(String holidayName) {
			this.holidayName = holidayName;
		}
		public LocalDate getHolidayDate() {
			return holidayDate;
		}
		public void setHolidayDate(LocalDate holidayDate) {
			this.holidayDate = holidayDate;
		}
		@Override
		public String toString() {
			return "Holiday [id=" + id + ", holidayName=" + holidayName + ", holidayDate=" + holidayDate + "]";
		}
		public Holiday(Long id, String holidayName, LocalDate holidayDate) {
			super();
			this.id = id;
			this.holidayName = holidayName;
			this.holidayDate = holidayDate;
		}
		public Holiday() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
	    

}
