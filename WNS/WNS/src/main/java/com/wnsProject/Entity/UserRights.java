package com.wnsProject.Entity;

import java.util.List;
import jakarta.persistence.*;
import jakarta.annotation.Generated;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user-Rights")
public class UserRights {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	 @Column(name = "emp_code")
	    private String empCode;

//	    private List<String> rights; // Store rights as a list
     
        //@ElementCollection
	    @Column(name = "rights")
	    private List<String> rights;
    
	    

//	@ElementCollection
//    @CollectionTable(name = "user_forms",  joinColumns = @JoinColumn(name = "user_rights_id"))
//    @Column(name = "form_name")
//    private List<String> assignedForms; // List of assigned forms
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getEmpCode() {
		return empCode;
	}

	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	
	public List<String> getRights() {
		return rights;
	}

	public void setRights(List<String> rights) {
		this.rights = rights;
	}
	

	@Override
	public String toString() {
		return "UserRights [id=" + id + ", empCode=" + empCode + ", rights=" + rights + "]";
	}

	

	public UserRights(Long id, String empCode, List<String> rights) {
		super();
		this.id = id;
		this.empCode = empCode;
		this.rights = rights;
	}

	public UserRights() {
		super();
		// TODO Auto-generated constructor stub
	}


	
	
	
	

}
