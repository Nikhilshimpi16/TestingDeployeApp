package com.wnsProject.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wnsProject.Entity.LeaveType;
import com.wnsProject.Service.LeaveTypeService;

@RestController
@RequestMapping("/api/leaveTypes")
public class LeaveTypeController {
	
	
	@Autowired
    private LeaveTypeService leaveTypeService;

    @GetMapping
    public List<LeaveType> getLeaveTypes() {
        return leaveTypeService.getAllLeaveTypes();
    }

    @PostMapping
    public LeaveType addLeaveType(@RequestBody LeaveType leaveType) {
        return leaveTypeService.saveLeaveType(leaveType);
    }

    @PutMapping("/{id}")
    public LeaveType updateLeaveType(@PathVariable Long id, @RequestBody LeaveType leaveType) {
        return leaveTypeService.updateLeaveType(id, leaveType);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaveType(@PathVariable
    		Long id) {
        leaveTypeService.deleteLeaveType(id);
    }

}
