package com.wnsProject.Serviceiml;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;
import com.wnsProject.Repository.EmployeeRepository;
import com.wnsProject.Repository.UserRightsRepository;
import com.wnsProject.Service.UserRightsService;

@Service
public class UserRightsServiceImpl implements UserRightsService{
	
	@Autowired
	private UserRightsRepository userRightRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;

//	@Override
//	public List<String> getAssignedForms(String username) {
//        return userRightRepository.findByUsername(username)
//                .map(UserRights::getAssignedForms)
//                .orElse(Collections.emptyList());
//    }

	@Override
	public UserRights saveRights(UserRights userrights) {
		return userRightRepository.save(userrights);
	}

	@Override
	public List<UserRights> getAllUserRights() {
		return userRightRepository.findAll();
	}

	@Override
	 public List<UserRights> getUserRightsByEmpCode(String empCode) {
        return userRightRepository.findByEmpCode(empCode);
    }
	// Rights Forms Get the On Dashbaord
	public boolean assignRightsToEmployee(String empCode, List<String> rights) {
		Optional<Employee> employee = employeeRepository.findByEmpName(empCode);
        if (employee.isPresent()) {
            Employee emp = employee.get();
            emp.setRights(rights); // Assuming rights is a field in Employee
            employeeRepository.save(emp);
            return true;
        }
        return false;
    }
    }
	

    
	


