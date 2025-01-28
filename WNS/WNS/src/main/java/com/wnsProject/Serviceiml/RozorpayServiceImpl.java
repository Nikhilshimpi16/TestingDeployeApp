package com.wnsProject.Serviceiml;



import com.razorpay.Order;

import com.razorpay.RazorpayClient;
import com.wnsProject.DTO.OrderRequest;
import com.wnsProject.Service.RozorpayService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Service
class RozorpayServiceImpl  implements RozorpayService{

	 @Value("${razorpay.key}")
	    private String apiKey;

	    @Value("${razorpay.secret}")
	    private String apiSecret;

	    
	    @Override
	    public Map<String, Object> createOrder(OrderRequest orderRequest) {
	        try {
	            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

	            JSONObject orderData = new JSONObject();
	            orderData.put("amount", orderRequest.getAmount()); // Amount in paise
	            orderData.put("currency", "INR");

	            Order order = razorpayClient.orders.create(orderData);

	            Map<String, Object> response = new HashMap<>();
	            response.put("orderId", order.get("id"));
	            response.put("amount", order.get("amount"));
	            response.put("currency", order.get("currency"));

	            return response;
	        } catch (Exception e) {
	            throw new RuntimeException("Error creating Razorpay order: " + e.getMessage(), e);
	        }
	    }}

