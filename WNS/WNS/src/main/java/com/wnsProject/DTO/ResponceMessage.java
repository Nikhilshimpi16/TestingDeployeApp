package com.wnsProject.DTO;

public class ResponceMessage {
	

	    private boolean success;
	    private String message;
	    
	    public ResponceMessage(String message, boolean success) {
	        this.message = message;
	        this.success = success;
	        
	    }
	
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
	    
	    
	    
	    
	}


