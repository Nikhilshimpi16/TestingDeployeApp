package com.wnsProject.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="LeaveType")
public class LeaveType {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leaveTypeName;
    private String gender;
    private Integer yearlyLimit;
    private Integer carryforwardLimit;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLeaveTypeName() {
		return leaveTypeName;
	}
	public void setLeaveTypeName(String leaveTypeName) {
		this.leaveTypeName = leaveTypeName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Integer getYearlyLimit() {
		return yearlyLimit;
	}
	public void setYearlyLimit(Integer yearlyLimit) {
		this.yearlyLimit = yearlyLimit;
	}
	public Integer getCarryforwardLimit() {
		return carryforwardLimit;
	}
	public void setCarryforwardLimit(Integer carryforwardLimit) {
		this.carryforwardLimit = carryforwardLimit;
	}
	@Override
	public String toString() {
		return "LeaveType [id=" + id + ", leaveTypeName=" + leaveTypeName + ", gender=" + gender + ", yearlyLimit="
				+ yearlyLimit + ", carryforwardLimit=" + carryforwardLimit + "]";
	}
	public LeaveType(Long id, String leaveTypeName, String gender, Integer yearlyLimit, Integer carryforwardLimit) {
		super();
		this.id = id;
		this.leaveTypeName = leaveTypeName;
		this.gender = gender;
		this.yearlyLimit = yearlyLimit;
		this.carryforwardLimit = carryforwardLimit;
	}
	public LeaveType() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
}
