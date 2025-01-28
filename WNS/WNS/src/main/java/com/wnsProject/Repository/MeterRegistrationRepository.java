package com.wnsProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.MeterRegistration;
@Repository
public interface MeterRegistrationRepository  extends JpaRepository<MeterRegistration, Long>{

}
