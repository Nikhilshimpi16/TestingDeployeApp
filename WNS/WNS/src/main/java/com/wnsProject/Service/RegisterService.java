package com.wnsProject.Service;

import java.util.List;

import java.util.Map;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;

import com.wnsProject.Entity.RegistrationForm;

public interface RegisterService {
	
	
	public RegistrationForm updateuser(Long id , RegistrationForm register);
	public void save(RegistrationForm register);
	public List<RegistrationForm> findAll();
	void saveAll(RegistrationForm registrationForm);
	 public ResponseEntity<Map<String, Integer>> getDashboardStats();
	RegistrationForm validateLogin(String email, String password);
	public long getRegistrationCount() ;
    }

