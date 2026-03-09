package com.example.salon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.salon.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long>{

}
