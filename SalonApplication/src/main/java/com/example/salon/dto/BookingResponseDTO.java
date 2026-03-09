package com.example.salon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
	
	private Long id;
	
	//Flat user Fields
	private Long userId;
	private String userName;
	
	//Flat Service Fields
	private Long serviceId;
	private String serviceName;
	private double servicePrice;
	private Integer serviceDuration;
	
	//Flat Staff  fields
	private Long staffId;
	private String staffName;
	private String staffSpecialization;
	
	//Booking details
	private String bookingDate;
	private String bookingTime;
	private String status;
}
