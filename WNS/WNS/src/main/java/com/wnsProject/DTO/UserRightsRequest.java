package com.wnsProject.DTO;

import java.util.List;

public class UserRightsRequest {
	
	private String empCode; // Employee code
    private String rights; // List of selected forms

    // Getters and Setters
    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getRights() {
        return rights;
    }

    public void setRights(String rights) {
        this.rights = rights;
    }
    
    

}
