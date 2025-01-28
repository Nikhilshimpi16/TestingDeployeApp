package com.wnsProject.Serviceiml;



import org.springframework.stereotype.Service;

import com.wnsProject.Entity.RegistrationForm;
import com.wnsProject.Repository.RegistrationRepository;
import com.wnsProject.Service.ReportService;

import CSVfile.CsvUtil;
import jakarta.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import java.io.ByteArrayInputStream;
import java.util.List;

@Service
public class ReportServiceImpl  implements ReportService{

    @Autowired
    private RegistrationRepository registrationRepository;

    public List<RegistrationForm> getAllUsers() {
        return registrationRepository.findAll();
    }

    public void deleteUserById(Long id) {
    	registrationRepository.deleteById(id);
    }

    public InputStreamResource generateCsvReport() {
        List<RegistrationForm> users = getAllUsers();
        ByteArrayInputStream reportStream = CsvUtil.createCsv(users);
        return new InputStreamResource(reportStream);
    }
}
