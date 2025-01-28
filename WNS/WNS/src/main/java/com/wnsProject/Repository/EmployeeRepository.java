package com.wnsProject.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

//	Optional<Employee> findByUsernameAndPassword(String username, String password);
    Optional<Employee> findByEmpName(String empName);
    List<String> findRightsByEmpName(String empCode);
    Optional<Employee> findByEmpCodeAndPassword(String empCode, String password);




}
