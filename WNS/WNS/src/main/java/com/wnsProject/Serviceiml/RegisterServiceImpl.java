package com.wnsProject.Serviceiml;

import java.util.List;



import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.RegistrationForm;
import com.wnsProject.Repository.RegistrationRepository;
import com.wnsProject.Service.RegisterService;
import com.wnsProject.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class RegisterServiceImpl implements RegisterService {

	@Autowired
	private RegistrationRepository registerRepo;
	
	  @Autowired
	    private PasswordEncoder passwordEncoder;	
	  
  // Report update
	  @Override
	  public RegistrationForm updateuser(Long id, RegistrationForm register) {
	      RegistrationForm register1 = registerRepo.findById(id)
	              .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));      

	      // Update the fields of register1
	      register1.setFirstName(register.getFirstName());
	      register1.setLastName(register.getLastName());
	      register1.setEmail(register.getEmail());
	      register1.setMobileNo(register.getMobileNo());
	      register1.setAddress(register.getAddress());
	      register1.setTaluka(register.getTaluka());
	      register1.setDistrict(register.getDistrict());
	      register1.setState(register.getState());
	      
	      // Save the updated entity using the repository
	      return registerRepo.save(register1);
	  }

	@Override
	public  void  saveAll(RegistrationForm registrationForm) {
        // Convert registrationForm to entity (if needed) and save it
        RegistrationForm entity = new RegistrationForm();
        entity.setFirstName(registrationForm.getFirstName());
        entity.setLastName(registrationForm.getLastName());
        entity.setEmail(registrationForm.getEmail());
        entity.setMobileNo(registrationForm.getMobileNo());
        entity.setAddress(registrationForm.getAddress());
        entity.setTaluka(registrationForm.getTaluka());
        entity.setDistrict(registrationForm.getDistrict());
        entity.setState(registrationForm.getState());
        registerRepo.save(entity); // Save to the database
      
        
	}
        
    
     
		@Override
		public List<RegistrationForm> findAll() {
			return registerRepo.findAll();
		}
		@Override
		public void save(RegistrationForm register) {
              registerRepo.save(register);			
		}
		
		 public String validateRegistration(RegistrationForm registrationForm) {
		        if (registerRepo.existsByEmail(registrationForm.getEmail())) {
		            return "Error: Email already exists!";
		        }
		        if (registerRepo.existsByMobileNo(registrationForm.getMobileNo())) {
		            return "Error: Mobile number already exists!";
		        }
		        return "Valid";
		    }
		 
		 
		@Override
		public ResponseEntity<Map<String, Integer>> getDashboardStats() {
			return (ResponseEntity<Map<String, Integer>>) registerRepo.findAll();
		}

		@Override
		public RegistrationForm validateLogin(String email, String password) {
	        return registerRepo.findByEmailAndPassword(email, password);
 
		}


		public void registerUser(RegistrationForm user) {
		    user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode password
		    registerRepo.save(user);
		}
		
		public RegistrationForm authenticate(String email, String password) {
	        // Implement logic to authenticate user (e.g., password check)
	        return registerRepo.findByEmailAndPassword(email, password);
	    }

//update pass
		 public void updatePassword(String email, String currentPassword, String newPassword) {
		        Optional<RegistrationForm> userOptional = registerRepo.findByEmail(email);

		        // Check if userOptional is null or empty
		        if (userOptional == null || userOptional.isEmpty()) {
		            throw new IllegalArgumentException("User not found with the provided email.");
		        }

		        RegistrationForm regiter = userOptional.get();

		        // Check if the current password matches
		        if (regiter.getPassword().equals(currentPassword)) {
		        	regiter.setPassword(newPassword);  // Update the password
		            registerRepo.save(regiter);  // Save the updated user
		        } else {
		            throw new IllegalArgumentException("Current password is incorrect.");
		        }
		    }
		 
		
		
//		@Transactional
//		public boolean updatePassword(String email, String currentPassword, String newPassword) {
//		     //Ensure the email is not null or empty
//		    if (email == null || email.isEmpty()) {
//		        throw new IllegalArgumentException("Email cannot be null or empty");
//		    }
//
//		    // Find user by email
//		    RegistrationForm registers = registerRepo.findByEmail(email);
//
//		    // Check if the user exists
//		    if (registers == null) {
//		        throw new IllegalArgumentException("User with email " + email + " does not exist");
//		    }
//
//		    // Check if the current password matches
//		    if (!registers.getPassword().equals(currentPassword)) {
//		        throw new IllegalArgumentException("Current password is incorrect");
//		    }
//
//		    // Update the password and save the user
//		    registers.setPassword(newPassword);  // Set new password
//		    registerRepo.save(registers);        // Save the updated user object
//
//		    return true;  // Return true indicating successful password update
//		}

		// Registration Count on Dash
		@Override
		public long getRegistrationCount() {
	        return registerRepo.countRegistrations();
		}

		
}



