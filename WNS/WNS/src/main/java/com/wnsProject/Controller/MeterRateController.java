package com.wnsProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.Entity.MeterRate;
import com.wnsProject.Service.MeterRateService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/meter-rate")
public class MeterRateController {
	@Autowired
	private MeterRateService meterRateService;
	
	@PostMapping
  public String saveRate(@RequestBody MeterRate metetrate)
  {
		meterRateService.saveRate(metetrate);
		return "Meter Rate save Successfully";
  }
	
	@PutMapping("/{id}")
	public String updateRate(@PathVariable Long id , @RequestBody MeterRate meterrate)
	{
		meterRateService.updateRate(id, meterrate);
		return "Meter Rate Updated Succefully";
	}
	
	@GetMapping("/latest")
	public MeterRate getRate()
	{
		return meterRateService.getLatestRate();
	}

}
