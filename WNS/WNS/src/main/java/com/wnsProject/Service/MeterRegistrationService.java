package com.wnsProject.Service;

import java.util.List;

import com.wnsProject.Entity.MeterRegistration;

public interface MeterRegistrationService {
	
	// public MeterRegistration registerMeter(MeterRegistration meterRegistration);
	 public List<MeterRegistration> getAllMeters();
	 public MeterRegistration saveMeter(MeterRegistration meterRegNo);
	 public MeterRegistration updateMeter(Long id, MeterRegistration updatedMeter);
	 public void deleteMeter(Long id);
	 

}
