package com.example.salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.salon.entity.Staff;
import com.example.salon.service.StaffService;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin("*")
public class StaffController {
	
	@Autowired
	private StaffService staffService;
	
	@PostMapping
	public Staff addStaff(@RequestBody Staff staff) {
		return staffService.addStaff(staff);
	}
	
	@GetMapping
	public List<Staff> getAllStaffs(){
		return staffService.getAllStaffs();
	}
	
	@GetMapping("/{id}")
	public Staff getStaffById(@PathVariable Long id) {
		return staffService.getStaffById(id);
	}
	
	@PutMapping("/{id}")
	public Staff updateStaff(@PathVariable Long id, @RequestBody Staff staff) {
		return staffService.updateStaff(id, staff);
	}
	
	@DeleteMapping("/{id}")
	public String deleteStaff(@PathVariable Long id) {
		staffService.deleteStaff(id);
		return "Staff Deleted Successfully!";
	}	
}
