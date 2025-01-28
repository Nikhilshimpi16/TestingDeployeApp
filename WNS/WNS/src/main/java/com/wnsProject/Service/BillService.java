package com.wnsProject.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import com.itextpdf.text.DocumentException;
import com.wnsProject.Entity.BillGenerated;

import jakarta.servlet.http.HttpServletResponse;

public interface BillService {
	public BillGenerated generateBill(BillGenerated bill);

	public BillGenerated getBillById(Long id);

	List<BillGenerated> getBillDetail();
   // List<BillGenerated> getBillByConsumerNo(String consumerNo);
    public BillGenerated getBillDetailsByConsumerNo(String consumerNo);
    
    //public List<BillGenerated> getBillsBetweenDates(LocalDate startDate, LocalDate endDate);

	public List<BillGenerated> getBillsByDateRange(String startDate, String endDate);

	double getTotalBillAmount();

//YearwiseReport
	public List<String> getAvailableFinancialYears();
	public List<BillGenerated> getBillsByFinancialYear(String financialYear);





//	 public double calculateTotalPaidAmount() ;

// double getPendingTotalAmount();
//
// Double getTotalPaidAmount();



}
