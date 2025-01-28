package com.wnsProject.DTO;

public class FinancialYearResponse {
	
        private String financialYear;
        private String startDate;
        private String endDate;

        public FinancialYearResponse(String financialYear, String startDate, String endDate) {
            this.financialYear = financialYear;
            this.startDate = startDate;
            this.endDate = endDate;
        }

        public String getFinancialYear() {
            return financialYear;
        }

        public String getStartDate() {
            return startDate;
        }

        public String getEndDate() {
            return endDate;
        }
    
}

