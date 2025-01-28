package com.wnsProject.Controller;

import java.security.PublicKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.Service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
	@Autowired
	private DashboardService dashboardService;
	
	@GetMapping("/consumer-count")
	 public Long getConsumerCount() {
        return dashboardService.getConsumerCount();
    } 
	
//	@GetMapping("/total-billing")
//	public Long getTotlaBilling() {
//		return dashboardService.getTotalBill();
//	}
	
	
}
