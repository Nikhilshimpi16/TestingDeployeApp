package com.wnsProject.Service;

import com.wnsProject.Entity.MeterRate;

public interface MeterRateService {
	public MeterRate getLatestRate();
	public void updateRate(Long id, MeterRate updatedRate) ;
	public void saveRate(MeterRate meterRate) ;

}
