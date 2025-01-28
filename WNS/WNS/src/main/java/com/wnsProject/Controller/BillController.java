package com.wnsProject.Controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.itextpdf.text.DocumentException;
import com.wnsProject.DTO.FinancialYearResponse;
import com.wnsProject.Entity.BillGenerated;
import com.wnsProject.Entity.Payment;
import com.wnsProject.Repository.BillRepository;
import com.wnsProject.Service.BillService;
import com.wnsProject.Service.PaymentService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/bills")
public class BillController {
	
	
	@Autowired
	private BillService billService;
	
	@Autowired
	private PaymentService paymentService;
	
	
//	 @GetMapping("/consumer/{consumerNo}")
//	    public ResponseEntity<List<BillGenerated>> getBillByConsumerNo(@PathVariable String consumerNo) {
//	        List<BillGenerated> bills = billService.getBillByConsumerNo(consumerNo);
//	        if (bills.isEmpty()) {
//	            return ResponseEntity.status(404).body(null);
//	        }
//	        return ResponseEntity.ok(bills);
//	    }
	 @GetMapping("/consumer/{consumerNo}")
	 public ResponseEntity<?> getBillDetails(@PathVariable String consumerNo) {
	        try {
	            // Fetch bill details
	            BillGenerated bill = billService.getBillDetailsByConsumerNo(consumerNo);

	            // Check if the consumer has already made a payment
	            Payment lastPayment = paymentService.getLastPaymentByConsumerNo(consumerNo);

	            if (lastPayment != null) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                        .body("Payment already made for this consumer.");
	            }

	            return ResponseEntity.ok(bill);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bill details.");
	        }
	    }
	 
	 
	 
	 
	 
	 @PostMapping
	    public BillGenerated generateBill(@RequestBody BillGenerated bill) {
	        // Calculate total and other necessary logic
	        bill.setTotal(bill.getPerMonthlyRate() + bill.getOtherCharges() + bill.getFees() - bill.getDeposited());
	        bill.setCalculateUnit(bill.getCurrentReading() - bill.getPreviousReading());
	        bill.setTotalBill(bill.getCalculateUnit() * bill.getPerUnitRate());
	        
	      
	        return billService.generateBill(bill);
	    }
	 
	 @GetMapping("/financialYear")
	 public ResponseEntity<Map<String, String>> getFinancialYear(
			 @RequestParam(value = "billGeneratedDate", required = false) LocalDate billGeneratedDate) {
				    if (billGeneratedDate == null) {
				        billGeneratedDate = LocalDate.now(); // Default to the current date
				    }
	        Map<String, String> response = new HashMap<>();
	        
	        try {
	            int year = billGeneratedDate.getYear();
	            String financialYear = year + "-" + (year + 1);
	            LocalDate startDate = LocalDate.of(year, 4, 1); // Financial year starts on April 1
	            LocalDate endDate = LocalDate.of(year + 1, 3, 31); // Ends on March 31 next year

	            response.put("financialYear", financialYear);
	            response.put("startDate", startDate.toString());
	            response.put("endDate", endDate.toString());

	            return ResponseEntity.ok(response);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }


	@GetMapping("/reports")
	public ResponseEntity<List<BillGenerated>> getBillsByDateRange(
            @RequestParam String startDate, 
            @RequestParam String endDate) {
        List<BillGenerated> filteredBills = billService.getBillsByDateRange(startDate, endDate);
        return ResponseEntity.ok(filteredBills);
    }
	
	 // Endpoint to fetch the total bill amount
    @GetMapping("/totalBillAmount")
    public double getTotalBillAmount() {
        return billService.getTotalBillAmount(); // Fetch and return the total bill amount
    }
    
   //FinanacialYear Reports
    @GetMapping("/financial-years")
    public ResponseEntity<List<String>>  getFinancialYears() {
    	List<String> financialYear = billService.getAvailableFinancialYears();
    	return ResponseEntity.ok(financialYear);
    }
    
    @GetMapping("/financial-year-report")
    public ResponseEntity<List<BillGenerated>> getFinancialYearReport(@RequestParam String financialYear)
    {
        //System.out.println("Fetching financial year report for: " + financialYear);
        if(financialYear  == null || financialYear.isEmpty()) {
        	throw new IllegalArgumentException("Fianacial Paparmeter is Missing..");
        }
    	List<BillGenerated> reports = billService.getBillsByFinancialYear(financialYear);
    	return ResponseEntity.ok(reports);
    }

}
