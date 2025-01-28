package com.wnsProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import com.wnsProject.Entity.RegistrationForm;
import com.wnsProject.Serviceiml.ReportServiceImpl;


import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SAReportController {

    @Autowired
    private ReportServiceImpl reportServiceimpl;

    @GetMapping("/report/registrations")
    public List<RegistrationForm> getAllReports() {
        return reportServiceimpl.getAllUsers();
    }

    @DeleteMapping("/report/registration/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    	reportServiceimpl.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report/downloadReport")
    public ResponseEntity<InputStreamResource> downloadReport() {
        InputStreamResource csvReport = reportServiceimpl.generateCsvReport();
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"admin_reports.csv\"")
                .contentType(org.springframework.http.MediaType.parseMediaType("application/csv"))
                .body(csvReport);
    }
}
