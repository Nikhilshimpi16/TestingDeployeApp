package com.wnsProject.Entity;



import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Entity
@Table(name="EmployeeRegistration")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String empName;
    private String empCode;
    private String department;
    private String designation;
    private String grade;
    private Date joiningDate;
    private Date officeDate;
    private String gender;
    private String category;
    private String email;
    private String password;

    
    @Lob
    private byte[] photoUrl;  // Store photo as byte array

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String dep) {
        this.department = dep;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Date getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(Date joiningDate) {
        this.joiningDate = joiningDate;
    }

    public Date getOfficeDate() {
        return officeDate;
    }

    public void setOfficeDate(Date officeDate) {
        this.officeDate = officeDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }



	public byte[] getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(byte[] photoUrl) {
		this.photoUrl = photoUrl;
	}
	
	

	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

	



	
	

	@Override
	public String toString() {
		return "Employee [id=" + id + ", empName=" + empName + ", empCode=" + empCode + ", department=" + department
				+ ", designation=" + designation + ", grade=" + grade + ", joiningDate=" + joiningDate + ", officeDate="
				+ officeDate + ", gender=" + gender + ", category=" + category + ", email=" + email + ", password="
				+ password + ", photoUrl=" + Arrays.toString(photoUrl) + "]";
	}

	

	public Employee(Long id, String empName, String empCode, String department, String designation, String grade,
			Date joiningDate, Date officeDate, String gender, String category, String email, String password,
			List<String> rights, byte[] photoUrl) {
		super();
		this.id = id;
		this.empName = empName;
		this.empCode = empCode;
		this.department = department;
		this.designation = designation;
		this.grade = grade;
		this.joiningDate = joiningDate;
		this.officeDate = officeDate;
		this.gender = gender;
		this.category = category;
		this.email = email;
		this.password = password;
		this.photoUrl = photoUrl;
	}

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void setPhotoUrl(String string) {
		// TODO Auto-generated method stub
		
	}

	public void setRights(List<String> rights) {
		// TODO Auto-generated method stub
		
	}
    
    
}
