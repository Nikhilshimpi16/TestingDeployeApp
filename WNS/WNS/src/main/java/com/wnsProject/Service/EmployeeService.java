package com.wnsProject.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.DocumentException;
import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;

import jakarta.servlet.http.HttpServletResponse;

public interface EmployeeService {

	   public List<Employee> getAllEmployees() ;
	    public Employee getEmployeeById(Long id) ;

	    public Employee saveEmployee(MultipartFile photo, String employeeJson) throws IOException;
	    public Employee updateEmployee(Long id, Employee employeeDetails);
	    public void deleteEmployee(Long id);
		public void exportReportAsPdf(HttpServletResponse response) throws DocumentException, IOException;
//		public List<String> getRightsByEmpName(String empCode);
		boolean validateEmployee(String empName, String password);
	    List<UserRights> getEmployeeRights(String empCode);		
	

}
