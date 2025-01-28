package com.wnsProject.Service;

import java.util.List;

import com.wnsProject.Entity.Department;

public interface DepartmentService {
	
	 public List<Department> getAllDepartments() ;
	    public Department saveDepartment(Department department) ;
	    public Department updateDepartment(Long id, Department updatedDepartment) ;
	    public void deleteDepartment(Long id) ;

	  
}
