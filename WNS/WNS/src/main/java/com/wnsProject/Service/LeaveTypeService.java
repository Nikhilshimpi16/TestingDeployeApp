package com.wnsProject.Service;

import java.util.List;

import com.wnsProject.Entity.LeaveType;

public interface LeaveTypeService {
	
	public List<LeaveType> getAllLeaveTypes();
	public LeaveType updateLeaveType(Long id, LeaveType leaveType);
	 public LeaveType saveLeaveType(LeaveType leaveType);
	 public void deleteLeaveType(Long id);
}
