package com.example.salon.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="bookings")
@Data
public class Booking {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="service_id")
	private SalonService service;
	
	@ManyToOne
	@JoinColumn(name="staff_id")
	private Staff staff;
	
	private LocalDate booking_date;
	private LocalTime booking_time;
	private String status;     // Booked OR Completed OR Cancelled
}
