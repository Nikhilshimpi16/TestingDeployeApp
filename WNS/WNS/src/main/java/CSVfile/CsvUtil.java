package CSVfile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

import com.wnsProject.Entity.RegistrationForm;

public class CsvUtil {

    public static ByteArrayInputStream createCsv(List<RegistrationForm> registration) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        writer.println("First Name,Last Name,Email,Mobile No,Address");
        for (RegistrationForm registrationForm : registration) {
            writer.println(String.format("%s,%s,%s,%s,%s",
            		registrationForm.getFirstName(), registrationForm.getLastName(), registrationForm.getEmail(), registrationForm.getMobileNo(), registrationForm.getAddress()));
        }
        writer.flush();
        return new ByteArrayInputStream(out.toByteArray());
    }
}
