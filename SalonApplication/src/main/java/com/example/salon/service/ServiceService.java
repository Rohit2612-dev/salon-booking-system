package com.example.salon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.salon.entity.SalonService;
import com.example.salon.repository.ServiceRepository;

@Service
public class ServiceService {
	
	@Autowired
	private ServiceRepository serviceRepository;
	
	public SalonService addService(SalonService service) {
		return serviceRepository.save(service);
	}
	
	public List<SalonService> getAllServices(){
		return serviceRepository.findAll();
	}
}
