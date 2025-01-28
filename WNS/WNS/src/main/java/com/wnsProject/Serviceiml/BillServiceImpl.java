package com.wnsProject.Serviceiml;

import java.awt.Font;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.wnsProject.Entity.BillGenerated;
import com.wnsProject.Entity.Consumer;
import com.wnsProject.Entity.Employee;
import com.wnsProject.Repository.BillRepository;
import com.wnsProject.Service.BillService;
import com.wnsProject.Service.ConsumerService;
import com.wnsProject.Service.MeterRateService;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class BillServiceImpl implements BillService {
	
	  @Autowired
	    private BillRepository billRepository;

	    @Autowired
	    private ConsumerService consumerService;
	    
	    @Autowired
	    private MeterRateService meterRateService;
	    /**
	     * Method to save a new bill
	     */
	    public BillGenerated generateBill(BillGenerated bill) {
	        // Fetch consumer details
	        Consumer consumer = consumerService.getConsumerByConsumerNo(bill.getConsumerNo());
	        bill.setName(consumer.getConsumerName());
	        
	        double perUnitRate = meterRateService.getLatestRate().getPrice(); // Fetch latest rate
	        bill.setPerUnitRate(perUnitRate);
	        
	        

	        // Set bill generated date and expiry date (3 months from generation)
	        bill.setBillGeneratedDate(LocalDate.now());
	        bill.setExpiryDate(LocalDate.now().plusMonths(3));
	        bill.setFinancialYear(bill.getFinancialYear());


	        // Calculate total bill
	        bill.setTotal(calculateTotal(bill));
	        
	        // Generate receipt number in the format "W0001-24-25"
//	        String receiptNo = generateReceiptNumber(null);
//	        bill.setReceiptNo(receiptNo);     
	        String updatedReceiptNo = generateReceiptNumber(bill.getFinancialYear());
	        bill.setReceiptNo(updatedReceiptNo);


	        // Save bill to repository
	        return billRepository.save(bill);
	    }
	    

	    /**
	     * Calculate the total bill amount
	     */
	    private double calculateTotal(BillGenerated bill) {
	        double unitConsumed = bill.getCurrentReading() - bill.getPreviousReading();
	        double monthlyBill = unitConsumed * bill.getPerUnitRate();
	        double totalBill = (monthlyBill + bill.getOtherCharges() + bill.getFees()) - bill.getDeposited();
	        
	        // Set calculated values
	       bill.setUnitConsumed(unitConsumed);
	        bill.setUnitConsumed(unitConsumed > 0 ? unitConsumed : 0);
	        bill.setTotalBill(totalBill);

	        return totalBill;
	    }
	    
	    
	    /**
	     * Generates a receipt number in the format "W0001-24-25".
	     * W: Prefix, 0001: Serial Number, 24-25: Financial Year.
	     * Automatically adjusts to the provided financial year.
	     */
//	    public String generateReceiptNumber(String providedFinancialYear) {
//	        String financialYear;
//
//	        // Determine the financial year (use provided or calculate dynamically)
//	        if (providedFinancialYear != null && !providedFinancialYear.isEmpty()) {
//	            financialYear = providedFinancialYear;
//	        } else {
//	            // Calculate the financial year dynamically
//	            LocalDate today = LocalDate.now();
//	            int currentYear = today.getYear();
//	            int currentMonth = today.getMonthValue();
//
//	            int startYear = currentMonth >= 4 ? currentYear : currentYear - 1; // Financial year starts in April
//	            int endYear = startYear + 1;
//
//	            // Format the financial year as "24-25" (for 2024-2025)
//	            financialYear = String.format("%02d-%02d", startYear % 100, endYear % 100);
//	        }
//
//	        // Generate the next serial number for the financial year
//	        Long nextSerialNumber = fetchNextSerialNumber(financialYear);
//
//	        // Format the serial number as W0001
//	        String formattedSerial = String.format("%04d", nextSerialNumber);
//
//	        // Combine the formatted serial number with the financial year
//	        return formattedSerial + "-" + financialYear;
//	    }
//
//	    /**
//	     * Fetches the next serial number for the specified financial year.
//	     */
//	    private long fetchNextSerialNumber(String financialYear) {
//	        // Query the database for the last used serial number for the given financial year
//	        String lastSerial = billRepository.findLastSerialForFinancialYear(financialYear);
//
//	       Integer lastSerialNumber = billRepository.getMaxReceiptNo(); // Fetch the last serial number
//	        return (lastSerialNumber == null ? 1 : lastSerialNumber + 1);
//	    }
	



	    
	    
//	    /**
//	     * Generates a receipt number in the format "W0001-24-25".
//	     * W: Prefix, 0001: Serial Number, 24-25: Financial Year.
//	     */
	    public String generateReceiptNumber(String providedFinancialYear) {
	        String financialYear = providedFinancialYear;

	        if (providedFinancialYear != null && !providedFinancialYear.isEmpty()) {
	            // If a financial year is provided, use it
	            financialYear = providedFinancialYear;
	        } else {
	            // Calculate the financial year if not provided
	            LocalDate today = LocalDate.now();
	            int currentYear = today.getYear();
	            int currentMonth = today.getMonthValue();

	            int startYear = currentMonth >= 4 ? currentYear : currentYear - 1; // April starts the financial year
	            int endYear = startYear + 1;

	            // Format the financial year as `YY-YY`
	            financialYear = String.format("%02d-%02d", startYear % 100, endYear % 100);
	        }

	        // Fetch the next serial number for the provided financial year
	        Long serialNumber = fetchNextSerialNumber(financialYear);

	        // Format the serial number with leading zeros (4 digits)
	        String formattedSerial = String.format("%04d", serialNumber);

	        // Combine the prefix, formatted serial number, and financial year
	        return "W" + formattedSerial + "/" + financialYear;
	    }

	    /**
	     * Fetches the next serial number for the receipt.
	     * Implement this method to ensure unique receipt numbers.
	     * This can use a database or file-based persistence mechanism.
	     */
	    private long fetchNextSerialNumber(String financialYear) {
	        // Example logic: Replace this with actual database persistence logic
	        Integer lastSerialNumber = billRepository.getMaxReceiptNo(financialYear); // Fetch the last serial number for the provided financial year
	        return (lastSerialNumber == null ? 1 : lastSerialNumber + 1);
	    }
	    

	    

		@Override
		   public BillGenerated getBillById(Long id) {
	        return billRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Bill not found with ID: " + id));
	    }

		@Override
		public List<BillGenerated> getBillDetail() {
			return billRepository.findAll();
		}

//		@Override
//		public List<BillGenerated> getBillByConsumerNo(String consumerNo) {
//	        return billRepository.findByConsumerNo(consumerNo);
//		}
		
	public BillGenerated getBillDetailsByConsumerNo(String consumerNo) {
         //Assuming there's a method in the repository that fetches bill details by consumer number
        return billRepository.findByConsumerNo(consumerNo);
    }
	
	
	 public List<BillGenerated> getBillsByDateRange(String startDate, String endDate) {
	        LocalDate start = LocalDate.parse(startDate);
	        LocalDate end = LocalDate.parse(endDate);
	        return billRepository.findByBillGeneratedDateBetween(start, end);
	    }
	 @Override
	    public double getTotalBillAmount() {
	        return billRepository.calculateTotalBillAmount();  // Call the repository method to sum totalBill
	    }


	 // FinancialYearWise Reports 
	@Override
	public List<String> getAvailableFinancialYears() {
	   return billRepository.findDistinctFinancialYears();
	}
	
	@Override
	public List<BillGenerated> getBillsByFinancialYear(String financialYear) {
		return billRepository.findByFinancialYear(financialYear);
	}

   
	 
		
		}
