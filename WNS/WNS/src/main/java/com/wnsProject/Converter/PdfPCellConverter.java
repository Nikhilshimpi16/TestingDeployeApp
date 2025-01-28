package com.wnsProject.Converter;

import com.itextpdf.text.pdf.PdfPCell;

import jakarta.persistence.AttributeConverter;

public class PdfPCellConverter implements AttributeConverter<PdfPCell, String> {  

    public String convertToDatabaseColumn(PdfPCell attribute) {
        // Convert PdfPCell to a storable format (e.g., extract a meaningful value)
        return attribute.toString();  // Example, you should implement proper conversion logic
    }

    public PdfPCell convertToEntityAttribute(String dbData) {
        // Convert from the stored value back to PdfPCell if necessary
        return new PdfPCell();  // You would need to reconstruct the PdfPCell object
    }
}
