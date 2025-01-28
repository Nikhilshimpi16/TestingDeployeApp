package com.wnsProject.Serviceiml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Repository.BillRepository;
import com.wnsProject.Repository.ConsumerRepository;
import com.wnsProject.Repository.PaymentRepository;
import com.wnsProject.Service.DashboardService;
@Service
public class DashboardServiceImpl implements DashboardService {
	
	
	  @Autowired
	    private ConsumerRepository consumerRepository;

	    @Autowired
	    private BillRepository billingRepository;
	    
	    @Autowired
	    private PaymentRepository paymentRepository;
	    
	    
	@Override
	public Long getConsumerCount() {
		return consumerRepository.count();
	}


//	@Override
//	public Long getTotalBill() {
//		return billingRepository.count();
//	}


	
	
	

}
