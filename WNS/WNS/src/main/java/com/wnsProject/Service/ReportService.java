package com.wnsProject.Service;

import java.util.List;

import org.springframework.core.io.InputStreamResource;

import com.wnsProject.Entity.RegistrationForm;


public interface ReportService {
	
	   public List<RegistrationForm> getAllUsers();
	   
	   public void deleteUserById(Long id);

	public InputStreamResource generateCsvReport();

}
