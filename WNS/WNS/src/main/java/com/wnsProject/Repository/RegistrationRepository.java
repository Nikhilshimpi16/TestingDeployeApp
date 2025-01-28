package com.wnsProject.Repository;



import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.RegistrationForm;

@Repository
public interface RegistrationRepository  extends JpaRepository<RegistrationForm, Long>{
	
	 //  @Query("SELECT COUNT(r) FROM Registration r")
   //   long countRegistrations();
	   
	   
	    //RegistrationForm existsByEmailAndPassword(String email, String password);
	    Optional<RegistrationForm> findByEmail(String email);
	   public	void save(Long id);
	RegistrationForm findByEmailAndPassword(String email, String password);
    @Query("SELECT COUNT(r) FROM RegistrationForm r")
	long countRegistrations();

    boolean existsByEmail(String email);
    boolean existsByMobileNo(String mobileNo);
}
