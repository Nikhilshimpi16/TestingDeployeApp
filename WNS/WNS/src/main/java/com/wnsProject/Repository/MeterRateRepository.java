package com.wnsProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.MeterRate;
@Repository
public interface MeterRateRepository  extends JpaRepository<MeterRate, Long>{

	MeterRate findTopByOrderByIdDesc();

}
