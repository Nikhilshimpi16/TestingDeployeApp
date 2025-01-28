package com.wnsProject.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.BillGenerated;
@Repository
public interface BillRepository  extends JpaRepository<BillGenerated, Long>{

	BillGenerated save(BillGenerated billGenerated);
    BillGenerated findByConsumerNo(String consumerNo);
    List<BillGenerated> findByBillGeneratedDateBetween(LocalDate startDate, LocalDate endDate);

    

    @Query("SELECT SUM(b.totalBill) FROM BillGenerated b")
    double calculateTotalBillAmount();
    
    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(receiptNo, 2, LOCATE('-', receiptNo) - 2) AS int)), 0) FROM BillGenerated WHERE receiptNo LIKE 'W%'")
    Integer getMaxReceiptNo(@Param("financialYear") String financialYear);

    @Query("SELECT MAX(b.receiptNo) FROM BillGenerated b WHERE b.financialYear = :financialYear")
    String findLastSerialForFinancialYear();
    
    // FinancialYearwise Report
    @Query("SELECT DISTINCT p.financialYear FROM BillGenerated p")
    List<String> findDistinctFinancialYears();
    
    @Query("SELECT b FROM BillGenerated b WHERE b.financialYear = :financialYear")
    List<BillGenerated> findByFinancialYear(@Param("financialYear") String financialYear);
    
    
  //  List<BillGenerated> findByFinancialYear(String financialYear);

}






