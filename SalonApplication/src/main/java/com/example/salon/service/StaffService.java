package com.example.salon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.salon.entity.Staff;
import com.example.salon.repository.StaffRepository;

@Service
public class StaffService {
	
	@Autowired
	private StaffRepository staffRepository;
	
	//ADD
	public Staff addStaff(Staff staff) {
		return staffRepository.save(staff);
	}
	
	//GET ALL
	public List<Staff> getAllStaffs(){
		return staffRepository.findAll();
	}
	
	//GET BY ID
	public Staff getStaffById(Long id) {
		return staffRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Staff not found with Id: "+id));
	}
	
	//UPDATE STAFF
	public Staff updateStaff(Long id, Staff updatedStaff) {
		Staff existingStaff = staffRepository.findById(id).
				orElseThrow(() -> new RuntimeException("Staff not found with Id: "+id));
		
		existingStaff.setName(updatedStaff.getName());
		existingStaff.setSpecialization(updatedStaff.getSpecialization());
		
		return staffRepository.save(existingStaff);
	}
	
	//DELETE STAFF
	public void deleteStaff(Long id) {
		if(!staffRepository.existsById(id)) {
			throw new RuntimeException("Staff not found with id: "+id);
		}
		staffRepository.deleteById(id);
	}
}
