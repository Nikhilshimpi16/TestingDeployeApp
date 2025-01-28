package com.wnsProject.Service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.wnsProject.Entity.UserRights;

public interface UserRightsService {
//	public List<String> getAssignedForms(String username) ;
	public UserRights saveRights(@RequestBody UserRights userrights);
	public List<UserRights> getAllUserRights();
	//public List<UserRights> findByEmpCode(String empCode);
	List<UserRights> getUserRightsByEmpCode(String empCode);
	public  boolean assignRightsToEmployee(String empCode, List<String> rights);
	
        
    }


