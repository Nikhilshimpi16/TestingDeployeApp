package com.wnsProject.Serviceiml;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.wnsProject.DTO.ConsumerReportDTO;
import com.wnsProject.Entity.Consumer;
import com.wnsProject.Entity.Employee;
import com.wnsProject.Repository.ConsumerRepository;
import com.wnsProject.Service.ConsumerService;
import jakarta.servlet.http.HttpServletResponse;


import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ConsumerServiceImpl implements ConsumerService {
	
	@Autowired
	private ConsumerRepository consumerRepository;
	
	 // automatic ConsumerNo show on Form
	 public String generateConsumerNo() {
	        Optional<Consumer> lastConsumer = consumerRepository.findTopByOrderByIdDesc();
	        if (lastConsumer.isPresent()) {
	            String lastConsumerNo = lastConsumer.get().getConsumerNo();
	            int newNumber = Integer.parseInt(lastConsumerNo.split("-")[1]) + 1;
	            return "C-" + newNumber;
	        }
	        return "C-1"; // Start with C-1 if no consumers exist
	    }

	 public List<Consumer> getAllConsumers() {
	        return consumerRepository.findAll();
	    }
	 
	 
	 public Consumer getConsumerByConsumerNo(String consumerNo) {
	        return consumerRepository.findByConsumerNo(consumerNo)
	                .orElseThrow(() -> new RuntimeException("Consumer not found with ConsumerNo: " + consumerNo));
	    }

	
	    public Consumer addConsumer(Consumer consumer) {
	        // Generate ConsumerNo in a "Sr.No" format
	        consumer.setConsumerNo("C-" + (consumerRepository.count() + 1));
	        return consumerRepository.save(consumer);
	    }

	    public Consumer updateConsumer(Long id, Consumer updatedConsumer) {
	        Optional<Consumer> consumerOpt = consumerRepository.findById(id);
	        if (consumerOpt.isPresent()) {
	            Consumer consumer = consumerOpt.get();
	            consumer.setConsumerName(updatedConsumer.getConsumerName());
	            consumer.setAddressLine1(updatedConsumer.getAddressLine1());
	            consumer.setAddressLine2(updatedConsumer.getAddressLine2());
	            consumer.setMobileNo(updatedConsumer.getMobileNo());
	            consumer.setAge(updatedConsumer.getAge());
	            consumer.setBusinessOrJob(updatedConsumer.getBusinessOrJob());
	            consumer.setDateOfTapConnected(updatedConsumer.getDateOfTapConnected());
	            consumer.setMeterNo(updatedConsumer.getMeterNo());
	            consumer.setWaterCourseName(updatedConsumer.getWaterCourseName());
	            consumer.setEmail(updatedConsumer.getEmail());
	            return consumerRepository.save(consumer);
	        }
	        return null;
	    }

	    public void deleteConsumer(Long id) {
	        consumerRepository.deleteById(id);
	    }
	    
	    
	    // Download report section
	    public byte[] generateConsumerReport(List<ConsumerReportDTO> consumers) {
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
            Paragraph title = new Paragraph("Water Billing Management System", titleFont);
            Paragraph title2 = new Paragraph("Consumer Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            title2.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(title2);

            // Table with adjusted column widths
            float[] columnWidths = {2f, 3f, 4f, 2.5f, 1.5f, 3f, 3f, 2f, 3f, 3f};
            PdfPTable table = new PdfPTable(columnWidths);
            table.setWidthPercentage(100); // Table width as percentage of the page
            table.setSpacingBefore(10);
            table.setSpacingAfter(10);

            // Header styling
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            BaseColor headerBackgroundColor = new BaseColor(200, 200, 200);

            addTableHeader(table, headerFont, headerBackgroundColor);

            // Adding rows
            Font cellFont = new Font(Font.FontFamily.HELVETICA, 10);
            for (ConsumerReportDTO consumer : consumers) {
                addTableRow(table, consumer, cellFont);
            }

            document.add(table);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (document.isOpen()) {
                document.close();
            }
        }

        return outputStream.toByteArray();
    }

    private void addTableHeader(PdfPTable table, Font headerFont, BaseColor backgroundColor) {
        String[] headers = {
            "Consumer No", "Consumer Name", "Address Line 1", "Mobile No", "Age",
            "Business/Job", "Date of Tap Connected", "Meter No", "Water Course Name", "Email"
        };

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            headerCell.setBackgroundColor(backgroundColor);
            headerCell.setPadding(10);
            table.addCell(headerCell);
        }
    }

    private void addTableRow(PdfPTable table, ConsumerReportDTO consumer, Font cellFont) {
        String[] rowData = {
            consumer.getConsumerNo(),
            consumer.getConsumerName(),
            consumer.getAddressLine1(),
            consumer.getMobileNo(),
            String.valueOf(consumer.getAge()),
            consumer.getBusinessOrJob(),
            consumer.getDateOfTapConnected(),
            consumer.getMeterNo(),
            consumer.getWaterCourseName(),
            consumer.getEmail()
        };

        for (String data : rowData) {
            PdfPCell cell = new PdfPCell(new Phrase(data != null ? data : "", cellFont));
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setPadding(8); // Add padding for better readability
            table.addCell(cell);
        }
    }
}	
		

		

