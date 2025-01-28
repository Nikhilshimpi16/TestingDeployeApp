package com.wnsProject.Service;

import java.io.IOException;
import java.util.List;

import com.itextpdf.text.DocumentException;
import com.wnsProject.DTO.ConsumerReportDTO;
import com.wnsProject.Entity.Consumer;

import jakarta.servlet.http.HttpServletResponse;

public interface ConsumerService {
	
	public String generateConsumerNo();
	 public Consumer addConsumer(Consumer consumer);
	  public Consumer updateConsumer(Long id, Consumer updatedConsumer);
	  public void deleteConsumer(Long id);
	  public List<Consumer> getAllConsumers();
		public Consumer getConsumerByConsumerNo(String consumerNo);
		 public byte[] generateConsumerReport(List<ConsumerReportDTO> consumers) ;

}
