package com.wnsProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.Entity.MeterRegistration;
import com.wnsProject.Service.MeterRegistrationService;

@RestController
@RequestMapping("/api/meter-register")
@CrossOrigin(origins = "http://localhost:3000")
public class MeterController {
	
	@Autowired
	private MeterRegistrationService meterRegNoService;
	
	 @GetMapping
	    public List<MeterRegistration> getAllMeters() {
	        return meterRegNoService.getAllMeters();
	    }

	    @PostMapping
	    public MeterRegistration createMeter(@RequestBody MeterRegistration meterRegNo) {
	        return meterRegNoService.saveMeter(meterRegNo);
	    }

	    @PutMapping("/{id}")
	    public MeterRegistration updateMeter(@PathVariable Long id, @RequestBody MeterRegistration meterRegNo) {
	        return meterRegNoService.updateMeter(id, meterRegNo);
	    }

	    @DeleteMapping("/{id}")
	    public String deleteMeter(@PathVariable Long id) {
	        meterRegNoService.deleteMeter(id);
	        return "Meter with ID " + id + " has been deleted.";
	    }
	 
}

	
	
	


