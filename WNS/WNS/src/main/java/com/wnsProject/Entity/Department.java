package com.wnsProject.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Department")
public class Department {
	
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private Long id;
	  
	    private String depName;
	    private String shortName;
	    private String description;
	    
	    
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getDepName() {
			return depName;
		}
		public void setDepName(String depName) {
			this.depName = depName;
		}
		public String getShortName() {
			return shortName;
		}
		public void setShortName(String shortName) {
			this.shortName = shortName;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
	
		@Override
		public String toString() {
			return "Department [depName=" + depName + ", shortName=" + shortName + ", description=" + description
					+ "]";
		}
		public Department(String depName, String shortName, String description, String category) {
			super();
			this.depName = depName;
			this.shortName = shortName;
			this.description = description;
		}
		public Department() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		
	    
	    
	    
	    

}
