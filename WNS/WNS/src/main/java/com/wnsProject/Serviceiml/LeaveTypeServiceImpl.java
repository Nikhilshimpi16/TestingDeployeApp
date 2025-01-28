package com.wnsProject.Serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wnsProject.Entity.LeaveType;
import com.wnsProject.Repository.LeaveTypeRepository;
import com.wnsProject.Service.LeaveTypeService;

@Service
public class LeaveTypeServiceImpl implements LeaveTypeService {
	
	@Autowired
	private LeaveTypeRepository leaveTypeRepository;
	
	
	public List<LeaveType> getAllLeaveTypes() {
        return leaveTypeRepository.findAll();
    }

    public LeaveType saveLeaveType(LeaveType leaveType) {
        return leaveTypeRepository.save(leaveType);
    }

    public LeaveType updateLeaveType(Long id, LeaveType leaveType) {
        leaveType.setId(id);
        return leaveTypeRepository.save(leaveType);
    }

    public void deleteLeaveType(Long id) {
        leaveTypeRepository.deleteById(id);
    }

}
