package com.example.salon.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

	private Long userId;
	private Long serviceId;
	private Long staffId;
	private String bookingDate;
	private String bookingTime;
	private String status;
}
