package com.wnsProject.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.UserRights;

@Repository
public interface UserRightsRepository extends JpaRepository<UserRights, Long> {

	UserRights save(UserRights userrights);
	
    List<UserRights> findByEmpCode(String empCode); // Fetch rights by empCode
    
    
    

	
	
	

}
