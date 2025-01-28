//package com.wnsProject.Controller;
//
//import java.time.LocalDate;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.wnsProject.Entity.Bills;
//import com.wnsProject.Service.BillsWaterService;
//import com.wnsProject.Serviceiml.BillsWaterServiceImpl;
//
//@RestController
//@RequestMapping("/api/bills")
//public class BillwaterController {
//	
//	@Autowired
//	private BillsWaterService billService;
//	
//	@GetMapping("/reports")
//    public List<Bills> getBillsByDateRange(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
//        return billService.getBillsByDateRange(startDate, endDate);
//    }
//
//}
