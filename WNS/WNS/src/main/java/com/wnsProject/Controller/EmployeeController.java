package com.wnsProject.Controller;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.DocumentException;
import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;
import com.wnsProject.Repository.EmployeeRepository;
import com.wnsProject.Service.EmployeeService;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000") // Adjust as needed
public class EmployeeController {
	
	    @Autowired
	    private EmployeeService employeeService;
	    

	  
	    //Fetch all Employess
	    @GetMapping
	    public List<Employee> getAllEmployees() {
	        return employeeService.getAllEmployees();
	    }
//
//	    // Get employee by ID
	    @GetMapping("/{id}")
	    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id , @RequestParam String empcode) {
	        Employee employee = employeeService.getEmployeeById(id);
	        if (employee != null) {
	            return ResponseEntity.ok(employee);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
//
	    // Add new employee
	    
	    @PostMapping
	    public ResponseEntity<String> registerEmployee(
	        @RequestParam("photo") MultipartFile photo,
	        @RequestParam("employee") String employeeJson
	    ) {
	        try {
	            employeeService.saveEmployee(photo, employeeJson);
	            return ResponseEntity.ok("Employee registered successfully!");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
	        }
	    }
	    
	    
//	    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee, @RequestPart("photo") MultipartFile photo) throws IOException {
//	        Employee savedEmployee = employeeService.addEmployee(employee, photo);
//	        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
//	    }

	    
	    
//	    // Update employee details
	    @PutMapping("/{id}")
	    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
	        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
	        if (updatedEmployee != null) {
	            return ResponseEntity.ok(updatedEmployee);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    // Delete employee by ID
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
	        employeeService.deleteEmployee(id);
	        return ResponseEntity.noContent().build();
	    }
	    @GetMapping("/report/pdf")
	    public void downloadPdfReport(HttpServletResponse response) throws DocumentException, IOException {
	        employeeService.exportReportAsPdf(response);
	    }

	    // Employee login and UserRights Section
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestParam String empCode, @RequestParam String password) {
	        if (employeeService.validateEmployee(empCode, password)) {
	            return ResponseEntity.ok("Login successful");
	        } else {
	            return ResponseEntity.status(401).body("Invalid credentials");
	        }
	    }

	    // get the employeeWiseForm on Dashboard
	    @GetMapping("/rights/{empCode}")
	    public ResponseEntity<List<UserRights>> getEmployeeRights(@PathVariable String empCode) {
	        return ResponseEntity.ok(employeeService.getEmployeeRights(empCode));
	    }
	    
	    
	    // Save user rights
//	    @PostMapping("/user-rights")
//	    public ResponseEntity<?> saveUserRights(@RequestBody Employee employeeDetails)
//	    {
//	    	Optional<Employee> employee = employeeRepository.findByEmpName(employeeDetails.getEmpName());
//	    	if(employee.isPresent()) {
//	    		employee.get().setRights(employeeDetails.getRights());
//	    		employeeRepository.save(employee.get());
//	    		return ResponseEntity.ok("User Rights update succefully !!");
//	    		
//	    	}
//	    	return ResponseEntity.badRequest().body("Employee not Found");
//	    }
	    
	    
	    // fetch empName user rights -
//	    @GetMapping("/user-rights/{username}")
//	    public ResponseEntity<List<String>> getUserRightsByEmployee(@PathVariable String empCode) {
//	        List<String> rights = employeeService.getRightsByEmpName(empCode);
//	        return ResponseEntity.ok(rights);
//	    }
	    
	 // Login and fetch rights
//	    @PostMapping("/login")
//	    public ResponseEntity<?> login(@RequestBody Employee loginRequest) {
//	        Optional<Employee> employee = employeeRepository.findByEmpName(loginRequest.getEmpName());
//	        if (employee.isPresent() && employee.get().getPassword().equals(loginRequest.getPassword())) {
//	            return ResponseEntity.ok(employee.get().getRights());
//	        }
//	        return ResponseEntity.status(401).body("Invalid credentials");
//	    }

	    }


