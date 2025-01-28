//package com.wnsProject.Serviceiml;
//
//import java.time.LocalDate;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.wnsProject.Entity.Bills;
//import com.wnsProject.Repository.BillWaterRepository;
//import com.wnsProject.Service.BillsWaterService;
//
//@Service
//public class BillsWaterServiceImpl  implements BillsWaterService{
//	
//	 @Autowired
//	    private BillWaterRepository billRepository;
//	 
//	 
//	 public List<Bills> getBillsByDateRange(LocalDate startDate, LocalDate endDate) {
//	        return billRepository.findByBillDateBetween(startDate, endDate);
//	    }
//
//
//}
