package com.wnsProject.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wnsProject.Entity.Consumer;
@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

    Optional<Consumer> findTopByOrderByIdDesc(); // Fetch the last consumer by ID
    Optional<Consumer> findByConsumerNo(String consumerNo);
	//Optional<Consumer> findById(String consumerNo);

    

}
