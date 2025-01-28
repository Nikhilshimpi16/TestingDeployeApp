package com.wnsProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.Holiday;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {

}
