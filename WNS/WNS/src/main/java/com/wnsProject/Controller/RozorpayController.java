package com.wnsProject.Controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.wnsProject.DTO.OrderRequest;
import com.wnsProject.Service.RozorpayService;

@RestController
@RequestMapping("/api/razorpay")
public class RozorpayController {

	private final RozorpayService razorpayService;

	  public RozorpayController(RozorpayService razorpayService) {
	        this.razorpayService = razorpayService;
    }

    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Map<String, Object> orderResponse = razorpayService.createOrder(orderRequest);
            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating Razorpay order");
        }
    }
}


