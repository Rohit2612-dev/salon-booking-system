package com.example.salon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalonServiceResponseDTO {

	private Long id;
	private String name;
	private String description;
	private double price;
	private Integer duration;
}
