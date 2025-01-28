package com.wnsProject.DTO;

import java.util.List;

import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;

public class LoginResponseDTO {
	
	private Employee employee;
    private List<UserRights> userRights;

    // Getters and Setters
    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<UserRights> getUserRights() {
        return userRights;
    }

    public void setUserRights(List<UserRights> userRights) {
        this.userRights = userRights;
    }

}
