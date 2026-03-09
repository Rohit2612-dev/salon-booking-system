package com.example.salon.dto;

import com.example.salon.entity.Booking;
import com.example.salon.entity.SalonService;
import com.example.salon.entity.Staff;
import com.example.salon.entity.User;

public class DtoMapper {
	
	//USER
	public static UserResponseDTO toUserResponse(User user) {
		if(user == null) 
			return null;
		
		return new UserResponseDTO(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getRole()
				);
	}
	
	public static User toUserEntity(UserRequestDTO dto) {
		User user = new User();
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setRole(dto.getRole() != null ? dto.getRole(): "USER");
		return user;
	}
	
	
	//STAFF
	public static StaffResponseDTO toStaffResponse(Staff staff) {
		if(staff == null)
			return null;
		return new StaffResponseDTO(
				staff.getId(),
				staff.getName(),
				staff.getSpecialization()
				);
	}
	
	public static Staff toStaffEntity(StaffRequestDTO dto) {
		Staff staff = new Staff();
		staff.setName(dto.getName());
		staff.setSpecialization(dto.getSpecialization());
		return staff;
	}
	
	
	//SALON SERVICES
	public static SalonServiceResponseDTO toServiceResponse(SalonService service) {
        if (service == null) return null;
        return new SalonServiceResponseDTO(
            service.getId(),
            service.getName(),
            service.getDescription(),
            service.getPrice(),
            service.getDuration()
            );
    }
	
	public static SalonService toServiceEntity(SalonServiceRequestDTO dto) {
		SalonService service = new SalonService();
		service.setName(dto.getName());
		service.setDescription(dto.getDescription());
		service.setPrice(dto.getPrice());
		service.setDuration(dto.getDuration());
		return service;
	}
	
	//BOOKING
	public static BookingResponseDTO toBookingResponse(Booking booking) {
		if(booking == null) return null;
		
		BookingResponseDTO dto = new BookingResponseDTO();
		dto.setId(booking.getId());
		dto.setStatus(booking.getStatus());
		
		// booking_date and booking_time are LocalDate/LocalTime
		dto.setBookingDate(booking.getBooking_date() != null
				? booking.getBooking_date().toString(): null);
		dto.setBookingTime(booking.getBooking_time() != null
				? booking.getBooking_time().toString(): null);
		
		//USER
		if(booking.getUser() != null) {
			dto.setUserId(booking.getUser().getId());
			dto.setUserName(booking.getUser().getName());
		}
		
		//SERVICE
		if(booking.getService() != null) {
			dto.setServiceId(booking.getService().getId());
			dto.setServiceName(booking.getService().getName());
			dto.setServicePrice(booking.getService().getPrice());
			dto.setServiceDuration(booking.getService().getDuration());
		}
		
		//STAFF
		if(booking.getStaff() != null) {
			dto.setStaffId(booking.getStaff().getId());
			dto.setStaffName(booking.getStaff().getName());
			dto.setStaffSpecialization(booking.getStaff().getSpecialization());
		}
		return dto;
	}
}


