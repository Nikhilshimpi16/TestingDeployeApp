package com.wnsProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.LeaveType;
@Repository
public interface LeaveTypeRepository extends JpaRepository<LeaveType, Long> {

}
