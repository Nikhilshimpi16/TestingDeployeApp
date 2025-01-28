package com.wnsProject.Serviceiml;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.MeterRate;
import com.wnsProject.Repository.MeterRateRepository;
import com.wnsProject.Service.MeterRateService;
@Service
public class MeterRateServiceImpl implements MeterRateService{
@Autowired
private MeterRateRepository meterRateRepository;


public void saveRate(MeterRate meterRate) {
    // Check if a rate already exists
    if (meterRateRepository.count() == 0) {
        meterRateRepository.save(meterRate);
    } else {
        throw new IllegalStateException("A rate is already set. Use the update function to change it.");
    }
}
	
// Update an existing meter rate
public void updateRate(Long id, MeterRate updatedRate) {
    Optional<MeterRate> existingRate = meterRateRepository.findById(id);
    if (existingRate.isPresent()) {
        MeterRate rate = existingRate.get();
        rate.setUnit(updatedRate.getUnit());
        rate.setPrice(updatedRate.getPrice());
        meterRateRepository.save(rate);
    } else {
        throw new IllegalStateException("Meter rate with ID " + id + " not found.");
    }
}

//Fetch the latest meter rate
public MeterRate getLatestRate() {
    return meterRateRepository.findTopByOrderByIdDesc();
}

}
