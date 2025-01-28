package com.wnsProject.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name="Billing-Generated")
public class BillGenerated {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
    private String consumerNo;
    private String name;
    @Column(name = "bill_generated_date", nullable = false)
    private LocalDate billGeneratedDate;
    private LocalDate expiryDate;
    @Column(name="financial_year_date")
    private String financialYear;
    private String financialYearStart;
    private String financialYearEnd;
    private Double currentReading;
    private Double previousReading;
    private Double calculateUnit;
    private Double perUnitRate;
    private Double unitConsumed;
    private Double perMonthlyRate;
    private Double otherCharges;
    private Double fees;
    private Double deposited;
    private String mode;
    private Double total;
    private Double totalBill;
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isPaid = false;
    private double receivedAmount;
    
    @Column(name = "receipt_no")
    private String receiptNo;

    
	public String getFinancialYearStart() {
		return financialYearStart;
	}

	public void setFinancialYearStart(String financialYearStart) {
		this.financialYearStart = financialYearStart;
	}

	public String getFinancialYearEnd() {
		return financialYearEnd;
	}

	public void setFinancialYearEnd(String financialYearEnd) {
		this.financialYearEnd = financialYearEnd;
	}

	public Boolean getIsPaid() {
		return isPaid;
	}

	public void setIsPaid(Boolean isPaid) {
		this.isPaid = isPaid;
	}

	public double getReceivedAmount() {
		return receivedAmount;
	}

	public void setReceivedAmount(double receivedAmount) {
		this.receivedAmount = receivedAmount;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConsumerNo() {
		return consumerNo;
	}

	public void setConsumerNo(String consumerNo) {
		this.consumerNo = consumerNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getBillGeneratedDate() {
		return billGeneratedDate;
	}

	public void setBillGeneratedDate(LocalDate billGeneratedDate) {
		this.billGeneratedDate = billGeneratedDate;
	}

	public LocalDate getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	} 

	public Double getPerMonthlyRate() {
		return perMonthlyRate;
	}

	public void setPerMonthlyRate(Double perMonthlyRate) {
		this.perMonthlyRate = perMonthlyRate;
	}

	public Double getOtherCharges() {
		return otherCharges;
	}

	public void setOtherCharges(Double otherCharges) {
		this.otherCharges = otherCharges;
	}

	public Double getFees() {
		return fees;
	}

	public void setFees(Double fees) {
		this.fees = fees;
	}

	public Double getDeposited() {
		return deposited;
	}

	public void setDeposited(Double deposited) {
		this.deposited = deposited;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Double getCurrentReading() {
		return currentReading;
	}

	public void setCurrentReading(Double currentReading) {
		this.currentReading = currentReading;
	}

	public Double getPreviousReading() {
		return previousReading;
	}

	public void setPreviousReading(Double previousReading) {
		this.previousReading = previousReading;
	}

	public Double getCalculateUnit() {
		return calculateUnit;
	}

	public void setCalculateUnit(Double calculateUnit) {
		this.calculateUnit = calculateUnit;
	}

	public Double getPerUnitRate() {
		return perUnitRate;
	}

	public void setPerUnitRate(Double perUnitRate) {
		this.perUnitRate = perUnitRate;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}

	public String getReceiptNo() {
		return receiptNo;
	}

	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}

	public Double getUnitConsumed() {
		return unitConsumed;
	}

	public void setUnitConsumed(Double unitConsumed) {
		this.unitConsumed = unitConsumed;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getFinancialYear() {
		return financialYear;
	}

	public void setFinancialYear(String financialYear) {
		this.financialYear = financialYear;
	}

	
	
	@Override
	public String toString() {
		return "BillGenerated [id=" + id + ", consumerNo=" + consumerNo + ", name=" + name + ", billGeneratedDate="
				+ billGeneratedDate + ", expiryDate=" + expiryDate + ", financialYear=" + financialYear
				+ ", financialYearStart=" + financialYearStart + ", financialYearEnd=" + financialYearEnd
				+ ", currentReading=" + currentReading + ", previousReading=" + previousReading + ", calculateUnit="
				+ calculateUnit + ", perUnitRate=" + perUnitRate + ", unitConsumed=" + unitConsumed
				+ ", perMonthlyRate=" + perMonthlyRate + ", otherCharges=" + otherCharges + ", fees=" + fees
				+ ", deposited=" + deposited + ", mode=" + mode + ", total=" + total + ", totalBill=" + totalBill
				+ ", isPaid=" + isPaid + ", receivedAmount=" + receivedAmount + ", receiptNo=" + receiptNo + "]";
	}

	

	public BillGenerated(Long id, String consumerNo, String name, LocalDate billGeneratedDate, LocalDate expiryDate,
			String financialYear, String financialYearStart, String financialYearEnd, Double currentReading,
			Double previousReading, Double calculateUnit, Double perUnitRate, Double unitConsumed,
			Double perMonthlyRate, Double otherCharges, Double fees, Double deposited, String mode, Double total,
			Double totalBill, Boolean isPaid, double receivedAmount, String receiptNo) {
		super();
		this.id = id;
		this.consumerNo = consumerNo;
		this.name = name;
		this.billGeneratedDate = billGeneratedDate;
		this.expiryDate = expiryDate;
		this.financialYear = financialYear;
		this.financialYearStart = financialYearStart;
		this.financialYearEnd = financialYearEnd;
		this.currentReading = currentReading;
		this.previousReading = previousReading;
		this.calculateUnit = calculateUnit;
		this.perUnitRate = perUnitRate;
		this.unitConsumed = unitConsumed;
		this.perMonthlyRate = perMonthlyRate;
		this.otherCharges = otherCharges;
		this.fees = fees;
		this.deposited = deposited;
		this.mode = mode;
		this.total = total;
		this.totalBill = totalBill;
		this.isPaid = isPaid;
		this.receivedAmount = receivedAmount;
		this.receiptNo = receiptNo;
	}

	public BillGenerated() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void setUnitConsumed(double unitConsumed) {
		// TODO Auto-generated method stub
		
	}

	public boolean isPaid() {
		// TODO Auto-generated method stub
		return false;
	}

	public void setPaid(boolean b) {
		// TODO Auto-generated method stub
		
	}
    
	    
   
    
   
    
    
    


}
