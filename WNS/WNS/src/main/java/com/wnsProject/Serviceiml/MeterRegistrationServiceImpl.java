package com.wnsProject.Serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.MeterRegistration;
import com.wnsProject.Repository.MeterRegistrationRepository;
import com.wnsProject.Service.MeterRegistrationService;
@Service
public class MeterRegistrationServiceImpl implements MeterRegistrationService {

	@Autowired 
	private MeterRegistrationRepository meterRegNoRepository;
	
	
	
	public List<MeterRegistration> getAllMeters() {
        return meterRegNoRepository.findAll();
    }

    public MeterRegistration saveMeter(MeterRegistration meterRegNo) {
        return meterRegNoRepository.save(meterRegNo);
    }

    public MeterRegistration updateMeter(Long id, MeterRegistration updatedMeter) {
        MeterRegistration existingMeter = meterRegNoRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Meter not found with id: " + id)
        );
        existingMeter.setMeterCompanyName(updatedMeter.getMeterCompanyName());
        existingMeter.setMeterNo(updatedMeter.getMeterNo());
        return meterRegNoRepository.save(existingMeter);
    }

    public void deleteMeter(Long id) {
        meterRegNoRepository.deleteById(id);
    }

}
