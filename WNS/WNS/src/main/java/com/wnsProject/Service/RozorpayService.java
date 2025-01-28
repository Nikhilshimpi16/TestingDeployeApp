package com.wnsProject.Service;

import java.util.Map;

import com.wnsProject.DTO.OrderRequest;

public interface RozorpayService {
	
    Map<String, Object> createOrder(OrderRequest orderRequest) throws Exception;

}
