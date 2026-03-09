package com.example.salon.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.salon.dto.BookingRequestDTO;
import com.example.salon.dto.BookingResponseDTO;
import com.example.salon.dto.DtoMapper;
import com.example.salon.entity.Booking;
import com.example.salon.entity.SalonService;
import com.example.salon.entity.Staff;
import com.example.salon.entity.User;
import com.example.salon.repository.BookingRepository;
import com.example.salon.repository.ServiceRepository;
import com.example.salon.repository.StaffRepository;
import com.example.salon.repository.UserRepository;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ServiceRepository salonServiceRepository;
    @Autowired private StaffRepository staffRepository;

    public BookingResponseDTO createBooking(BookingRequestDTO dto) {
        Booking booking = new Booking();
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found: " + dto.getUserId()));
        SalonService service = salonServiceRepository.findById(dto.getServiceId()).orElseThrow(() -> new RuntimeException("Service not found: " + dto.getServiceId()));
        Staff staff = staffRepository.findById(dto.getStaffId()).orElseThrow(() -> new RuntimeException("Staff not found: " + dto.getStaffId()));
        booking.setUser(user);
        booking.setService(service);
        booking.setStaff(staff);
        booking.setStatus("BOOKED");
        if (dto.getBookingDate() != null && !dto.getBookingDate().isEmpty()) booking.setBooking_date(LocalDate.parse(dto.getBookingDate()));
        if (dto.getBookingTime() != null && !dto.getBookingTime().isEmpty()) booking.setBooking_time(LocalTime.parse(dto.getBookingTime()));
        return DtoMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll().stream().map(DtoMapper::toBookingResponse).collect(Collectors.toList());
    }

    public BookingResponseDTO getBookingById(Long id) {
        return DtoMapper.toBookingResponse(bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found: " + id)));
    }

    public BookingResponseDTO updateBooking(Long id, BookingRequestDTO dto) {
        Booking existing = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        if (dto.getUserId() != null) existing.setUser(userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));
        if (dto.getServiceId() != null) existing.setService(salonServiceRepository.findById(dto.getServiceId()).orElseThrow(() -> new RuntimeException("Service not found")));
        if (dto.getStaffId() != null) existing.setStaff(staffRepository.findById(dto.getStaffId()).orElseThrow(() -> new RuntimeException("Staff not found")));
        if (dto.getBookingDate() != null && !dto.getBookingDate().isEmpty()) existing.setBooking_date(LocalDate.parse(dto.getBookingDate()));
        if (dto.getBookingTime() != null && !dto.getBookingTime().isEmpty()) existing.setBooking_time(LocalTime.parse(dto.getBookingTime()));
        if (dto.getStatus() != null) existing.setStatus(dto.getStatus());
        return DtoMapper.toBookingResponse(bookingRepository.save(existing));
    }

    // PATCH — status only (admin marks COMPLETED, user marks CANCELLED)
    public BookingResponseDTO updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        if (!List.of("BOOKED", "COMPLETED", "CANCELLED").contains(status))
            throw new RuntimeException("Invalid status: " + status);
        if (!booking.getStatus().equals("BOOKED"))
            throw new RuntimeException("Only BOOKED appointments can be updated.");
        booking.setStatus(status);
        return DtoMapper.toBookingResponse(bookingRepository.save(booking));
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) throw new RuntimeException("Booking not found: " + id);
        bookingRepository.deleteById(id);
    }
}