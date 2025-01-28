package com.wnsProject.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.DTO.UserRightsRequest;
import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;
import com.wnsProject.Repository.UserRightsRepository;
import com.wnsProject.Service.EmployeeService;
import com.wnsProject.Service.UserRightsService;

@RestController
@RequestMapping("/api/user-rights")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRightsController {
	
	@Autowired
	private UserRightsService userRightsService;
	
	@Autowired
	private EmployeeService employeeService;
	
	 @PostMapping
	    public ResponseEntity<String> assignUserRights(@RequestBody UserRights request) {
		 System.out.println("Username: " + request.getEmpCode());
		    System.out.println("Rights: " + request.getRights());
	        if (request.getEmpCode() == null || request.getEmpCode().isEmpty()) {
	            return ResponseEntity.badRequest().body("Employee Code is required");
	        }
	        if (request.getRights() == null || request.getRights().isEmpty()) {
	            return ResponseEntity.badRequest().body("Rights cannot be empty");
	        }

	        UserRights userRights = new UserRights();
	        userRights.setEmpCode(request.getEmpCode());
	        userRights.setRights(request.getRights());

	        userRightsService.saveRights(userRights);
	        return ResponseEntity.ok("User rights assigned successfully");
	    }

	 @GetMapping("/{empCode}")
	    public ResponseEntity<UserRights> getUserRights(@PathVariable String empCode) {
	        List<UserRights> rights = userRightsService.getUserRightsByEmpCode(empCode);
	        if (rights.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	        return ResponseEntity.ok(rights.get(0));
	    }
	 
	 
	 @PostMapping("/{empCode}/assign")
	    public ResponseEntity<String> assignUserRights(
	            @RequestParam String empCode,
	            @RequestBody List<String> rights) {
		 System.out.println("Username: " + empCode);
		    System.out.println("Rights: " + rights);

	        if (empCode == null || empCode.isEmpty()) {
	            return ResponseEntity.badRequest().body("Employee Code is required");
	        }
	        if (rights == null || rights.isEmpty()) {
	            return ResponseEntity.badRequest().body("Rights cannot be empty");
	        }

	        // Logic to assign user rights goes here
	         userRightsService.assignRightsToEmployee(empCode, rights);

	        return ResponseEntity.ok("User rights assigned successfully");
	    }
	
	

}
