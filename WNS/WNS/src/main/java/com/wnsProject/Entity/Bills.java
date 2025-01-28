//package com.wnsProject.Entity;
//
//import java.time.LocalDate;
//
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//
//import java.time.LocalDate;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name="findwaterBills")
//public class Bills {
//	
//	 @Id
//	    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	    private Long id;
//
//	    @Column(name = "bill_no", nullable = false, unique = true)
//	    private String receiptNo;
//
//	    @Column(name = "consumer_no")
//	    private String consumerNo;
//
//	    @Column(name = "consumer_name")
//	    private String name;
//
//	    @Column(name = "city")
//	    private String city;
//
//	    @Column(name = "bill_generated_date")
//	    private LocalDate billGeneratedDate;
//
//	    @Column(name = "expiry_date")
//	    private LocalDate expiryDate;
//
//	    @Column(name = "total")
//	    private Double total;
//
//		public Long getId() {
//			return id;
//		}
//
//		public void setId(Long id) {
//			this.id = id;
//		}
//
//		
//
//		public String getReceiptNo() {
//			return receiptNo;
//		}
//
//		public void setReceiptNo(String receiptNo) {
//			this.receiptNo = receiptNo;
//		}
//
//		public String getName() {
//			return name;
//		}
//
//		public void setName(String name) {
//			this.name = name;
//		}
//
//		public String getConsumerNo() {
//			return consumerNo;
//		}
//
//		public void setConsumerNo(String consumerNo) {
//			this.consumerNo = consumerNo;
//		}
//
//		
//
//		public String getCity() {
//			return city;
//		}
//
//		public void setCity(String city) {
//			this.city = city;
//		}
//
//		public LocalDate getBillGeneratedDate() {
//			return billGeneratedDate;
//		}
//
//		public void setBillGeneratedDate(LocalDate billGeneratedDate) {
//			this.billGeneratedDate = billGeneratedDate;
//		}
//
//		public LocalDate getExpiryDate() {
//			return expiryDate;
//		}
//
//		public void setExpiryDate(LocalDate expiryDate) {
//			this.expiryDate = expiryDate;
//		}
//
//		public Double getTotal() {
//			return total;
//		}
//
//		public void setTotal(Double total) {
//			this.total = total;
//		}
//
//		
//
//		@Override
//		public String toString() {
//			return "Bills [id=" + id + ", receiptNo=" + receiptNo + ", consumerNo=" + consumerNo + ", name=" + name
//					+ ", city=" + city + ", billGeneratedDate=" + billGeneratedDate + ", expiryDate=" + expiryDate
//					+ ", total=" + total + "]";
//		}
//
//		
//
//		public Bills(Long id, String receiptNo, String consumerNo, String name, String city,
//				LocalDate billGeneratedDate, LocalDate expiryDate, Double total) {
//			super();
//			this.id = id;
//			this.receiptNo = receiptNo;
//			this.consumerNo = consumerNo;
//			this.name = name;
//			this.city = city;
//			this.billGeneratedDate = billGeneratedDate;
//			this.expiryDate = expiryDate;
//			this.total = total;
//		}
//
//		public Bills() {
//			super();
//			// TODO Auto-generated constructor stub
//		}
//
//
//	    
//	    
//}
