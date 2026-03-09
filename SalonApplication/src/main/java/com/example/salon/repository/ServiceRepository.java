package com.example.salon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.salon.entity.SalonService;

public interface ServiceRepository extends JpaRepository<SalonService, Long> {

}
