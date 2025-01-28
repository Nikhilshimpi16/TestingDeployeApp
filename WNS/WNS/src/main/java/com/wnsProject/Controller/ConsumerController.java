package com.wnsProject.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;
import com.wnsProject.DTO.ConsumerReportDTO;
import com.wnsProject.Entity.Consumer;
import com.wnsProject.Service.ConsumerService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/consumers")
@CrossOrigin(origins = "http://localhost:3000")
public class ConsumerController {
	
	 @Autowired
	    private ConsumerService consumerService;

//	 @GetMapping
//	 public ResponseEntity<Map<String, String>> getAllConsumers() {
//	        String latestConsumerNo = consumerService.getAllConsumers();
//	        Map<String, String> response = new HashMap();
//	        response.put("consumerNo", latestConsumerNo);
//	        return ResponseEntity.ok(response);
//	    }
	 //Get ALl Data.
	 @GetMapping
	    public ResponseEntity<List<Consumer>> getAllConsumers() {
        List<Consumer> consumers = consumerService.getAllConsumers();
	        return ResponseEntity.ok(consumers);
	    }
	 
	 
	 @GetMapping("/{consumerNo}")  // This should be GET
	    public ResponseEntity<Map<String, String>> getConsumer(@PathVariable String consumerNo) {
	        Consumer consumer = consumerService.getConsumerByConsumerNo(consumerNo);

	        Map<String, String> response = new HashMap<>();
	        response.put("name", consumer.getConsumerName());
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 @GetMapping("/generate-number")
	    public ResponseEntity<String> getGeneratedConsumerNo() {
	        String generatedConsumerNo = consumerService.generateConsumerNo();
	        return ResponseEntity.ok(generatedConsumerNo);
	    }
	 
	

	    @PostMapping
	    public Consumer addConsumer(@RequestBody Consumer consumer) {
	        return consumerService.addConsumer(consumer);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Consumer> updateConsumer(@PathVariable("id") Long id, @RequestBody Consumer updatedConsumer) {
	        Consumer consumer = consumerService.updateConsumer(id, updatedConsumer);
	        return ResponseEntity.ok(consumer);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteConsumer(@PathVariable("id") Long id) {
	        consumerService.deleteConsumer(id);
	        return ResponseEntity.noContent().build();

}
	    
	    // DownlaodReport Section 
	    @GetMapping("/report")
	    public ResponseEntity<byte[]> downloadReport() {
	        List<Consumer> consumers = consumerService.getAllConsumers();

	        List<ConsumerReportDTO> reportData = consumers.stream()
	            .map(ConsumerReportDTO::new)
	            .collect(Collectors.toList());

	        // Generate PDF (using a library like iText or Apache POI for Excel)
	        byte[] pdfContent = consumerService.generateConsumerReport(reportData);

	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_PDF);
	        headers.setContentDisposition(ContentDisposition.attachment().filename("ConsumerReport.pdf").build());

	        return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
	    }
	    
}
