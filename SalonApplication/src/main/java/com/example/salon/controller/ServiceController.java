package com.example.salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.salon.entity.SalonService;
import com.example.salon.service.ServiceService;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("*")
public class ServiceController {
	
	@Autowired
	private ServiceService serviceService;
	
	@PostMapping
	public SalonService addService(@RequestBody SalonService service) {
		return serviceService.addService(service);
	}
	
	@GetMapping
	public List<SalonService> getAllServices(){
		return serviceService.getAllServices();
	}
}
