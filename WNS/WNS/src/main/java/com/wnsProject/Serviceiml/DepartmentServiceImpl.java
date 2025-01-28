package com.wnsProject.Serviceiml;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.Department;
import com.wnsProject.Repository.DepartmentRepository;
import com.wnsProject.Service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

	@Autowired 
	private DepartmentRepository departmentRepository;
	
	
	@Override
	public List<Department> getAllDepartments() {
	    return departmentRepository.findAll();
	}

	@Override
	public Department saveDepartment(Department department){
		return departmentRepository.save(department);
	}

	@Override
	public Department updateDepartment(Long id, Department updatedDepartment) {
     Optional<Department> optionolDepartment = departmentRepository.findById(id);
     if(optionolDepartment.isPresent())
     {
    	 Department department = optionolDepartment.get();
    	 department.setDepName(updatedDepartment.getDepName());
    	 department.setShortName(updatedDepartment.getShortName());
    	 department.setDescription(updatedDepartment.getDescription());
    	 return departmentRepository.save(department);
     }
		return null;
	}

	@Override
	public void deleteDepartment(Long id) {
		departmentRepository.deleteById(id);
	}
	

}
