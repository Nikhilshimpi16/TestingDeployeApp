package com.wnsProject.Serviceiml;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wnsProject.Entity.Employee;
import com.wnsProject.Entity.UserRights;
import com.wnsProject.Repository.EmployeeRepository;
import com.wnsProject.Repository.UserRightsRepository;
import com.wnsProject.Service.EmployeeService;

import jakarta.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
    private EmployeeRepository employeeRepository;
	
	@Autowired
	private UserRightsRepository userRightsRepository;
	
	@Autowired
	private JavaMailSender mailSender;

	   public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }

	    public Employee getEmployeeById(Long id) {
	        Optional<Employee> employee = employeeRepository.findById(id);
	        return employee.orElse(null);
	    }

	    public Employee saveEmployee(MultipartFile photo, String employeeJson) throws IOException {
	        ObjectMapper objectMapper = new ObjectMapper();
	        Employee employee = objectMapper.readValue(employeeJson, Employee.class);

	        // Generate username and password
	        String username = employee.getEmpCode();
	        String password = UUID.randomUUID().toString().substring(0, 8);

	        // Save photo as bytes
	        employee.setPhotoUrl(photo.getBytes());
	        employee.setPassword(password);
	        employeeRepository.save(employee);

	        // Send email with username and password
	        sendEmail(employee.getEmail(), username, password);

	        return employee;
	    }
	    
	    private void sendEmail (String Email , String username , String password)
	    {
	    	SimpleMailMessage message = new SimpleMailMessage();
	    	message.setTo(Email);
	    	message.setSubject("Your Employee Account Details");
	        message.setText("Welcome to the company!\n\nYour account details are:\nUsername: " + username + "\nPassword: " + password);
	        
	        mailSender.send(message);
	    }
	    
	    
	    public Employee updateEmployee(Long id, Employee employeeDetails) {
	        Employee employee = getEmployeeById(id);
	        if (employee != null) {
	            employee.setEmpCode(employeeDetails.getEmpCode());
	            employee.setEmpName(employeeDetails.getEmpName());
	            employee.setDepartment(employeeDetails.getDepartment());
	            employee.setDesignation(employeeDetails.getDesignation());
	            employee.setGrade(employeeDetails.getGrade());
	            employee.setJoiningDate(employeeDetails.getJoiningDate());
	            employee.setOfficeDate(employeeDetails.getOfficeDate());
	            employee.setGender(employeeDetails.getGender());
	            employee.setPhotoUrl(employeeDetails.getPhotoUrl());
	            return employeeRepository.save(employee);
	        }
	        return null;
	    }

	    @Override
	    public boolean validateEmployee(String empCode, String password) {
	        return employeeRepository.findByEmpCodeAndPassword(empCode, password).isPresent();
	    }
	    
	    // also this get the On Dashbaord
	    @Override
	    public List<UserRights> getEmployeeRights(String empCode) {
	        return userRightsRepository.findByEmpCode(empCode);
	    }
//	    public List<String> getRightsByUsername(String empName) {
//	        return employeeRepository.findRightsByEmpName(empName);
//	    }
	    
	    public void deleteEmployee(Long id) {
	        employeeRepository.deleteById(id);
	    }
	    
	    //download report 
	    public void exportReportAsPdf(HttpServletResponse response) throws DocumentException, IOException {
	        List<Employee> employees = employeeRepository.findAll();

	        // Set response headers
	        response.setContentType("application/pdf");
	        response.setHeader("Content-Disposition", "attachment; filename=\"employee_report.pdf\"");

	        // Create the document
	        Document document = new Document(PageSize.A4, 30, 20, 30, 30);
	        PdfWriter.getInstance(document, response.getOutputStream());

	        // Open the document
	        document.open();

	        // Title
	        Paragraph title = new Paragraph("Water Billing Management System", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, BaseColor.BLACK));
	        title.setAlignment(Element.ALIGN_CENTER);
	        title.setSpacingAfter(20);
	        document.add(title);
	        
	        //title2
	        Paragraph title2 = new Paragraph("Employee Report", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 15, BaseColor.RED));
	        title2.setAlignment(Element.ALIGN_CENTER);
	        title2.setSpacingAfter(20);
	        document.add(title2);

	        // Table with 9 columns
	        PdfPTable table = new PdfPTable(9);
	        table.setWidthPercentage(100); // Table occupies full page width
	        table.setSpacingBefore(10f);
	        table.setSpacingAfter(10f);

	        // Set column widths (proportional)
	        float[] columnWidths = {1.5f, 2f, 2f, 2f, 1.5f, 2f, 2f, 1.5f, 1.5f};
	        table.setWidths(columnWidths);

	        // Table Header Styling
	        PdfPCell headerCell;
	        String[] headers = {"EmpCode", "EmpName", "Department", "Designation", "Grade", "Joining Date", "Office Date", "Gender", "Category"};
	        for (String header : headers) {
	            headerCell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE)));
	            headerCell.setBackgroundColor(BaseColor.DARK_GRAY);
	            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            headerCell.setPadding(10f);
	            table.addCell(headerCell);
	        }

	        // Table Data Styling
	        PdfPCell dataCell;
	        for (Employee employee : employees) {
	            dataCell = new PdfPCell(new Phrase(employee.getEmpCode(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getEmpName(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getDepartment(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getDesignation(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getGrade(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getJoiningDate() != null ? employee.getJoiningDate().toString() : "N/A", FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getOfficeDate() != null ? employee.getOfficeDate().toString() : "N/A", FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getGender(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);

	            dataCell = new PdfPCell(new Phrase(employee.getCategory(), FontFactory.getFont(FontFactory.HELVETICA, 10)));
	            dataCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	            dataCell.setPadding(8f);
	            table.addCell(dataCell);
	        }
	    

	        // Add table to document
	        document.add(table);

	        // Close the document
	        document.close();
	    }
	    // User Rigths Section
	    
//	    public Map<String, Object> login(String username, String password) {
//	        // Perform authentication logic
//	        Employee employee = employeeRepository.findByUsernameAndPassword(username, password)
//	                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
//
//	        // Fetch assigned forms
//	        List<String> assignedForms = userRightsService.getAssignedForms(username);
//
//	        // Return response
//	        Map<String, Object> response = new HashMap<>();
//	        response.put("employee", employee);
//	        response.put("forms", assignedForms);
//	        return response;
//	    }
	}




