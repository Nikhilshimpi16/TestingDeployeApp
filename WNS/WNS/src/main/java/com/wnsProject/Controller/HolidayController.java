package com.wnsProject.Controller;

import java.util.List;

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

import com.wnsProject.Entity.Holiday;
import com.wnsProject.Repository.HolidayRepository;

@RestController
@RequestMapping("/api/holidays")
public class HolidayController {

	
	 @Autowired
	    private HolidayRepository holidayRepository;

	    @GetMapping
	    public List<Holiday> getAllHolidays() {
	        return holidayRepository.findAll();
	    }

	    @PostMapping
	    public Holiday addHoliday(@RequestBody Holiday holiday) {
	        return holidayRepository.save(holiday);
	    }

	    @PutMapping("/{id}")
	    public Holiday updateHoliday(@PathVariable Long id, @RequestBody Holiday holiday) {
	        holiday.setId(id);
	        return holidayRepository.save(holiday);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteHoliday(@PathVariable Long id) {
	        holidayRepository.deleteById(id);
	    }
}
