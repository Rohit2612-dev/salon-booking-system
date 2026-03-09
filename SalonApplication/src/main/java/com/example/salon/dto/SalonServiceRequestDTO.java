package com.example.salon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor
@AllArgsConstructor
public class SalonServiceRequestDTO {
	
	private String name;
	private String description;
	private double price;
	private Integer duration;
}
