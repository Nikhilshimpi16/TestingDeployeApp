//package com.wnsProject.Entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "user_rights_details")
//public class UserRightDetail {
//	
//	@Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "right", nullable = false)
//    private String right;
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getRight() {
//		return right;
//	}
//
//	public void setRight(String right) {
//		this.right = right;
//	}
//
//	@Override
//	public String toString() {
//		return "UserRightDetail [id=" + id + ", right=" + right + "]";
//	}
//
//	public UserRightDetail() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//
//
//}
