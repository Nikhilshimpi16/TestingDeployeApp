package com.wnsProject.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.Department;
@Repository
public interface DepartmentRepository  extends JpaRepository<Department, Long>{

	Optional<Department> findById(Long id);

	void deleteById(Long id);

}
