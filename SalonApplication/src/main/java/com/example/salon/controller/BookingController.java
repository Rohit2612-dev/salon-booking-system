package com.example.salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.salon.dto.BookingRequestDTO;
import com.example.salon.dto.BookingResponseDTO;
import com.example.salon.dto.StatusUpdateDTO;
import com.example.salon.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public BookingResponseDTO createBooking(@RequestBody BookingRequestDTO dto) {
        return bookingService.createBooking(dto);
    }

    @GetMapping
    public List<BookingResponseDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public BookingResponseDTO getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PutMapping("/{id}")
    public BookingResponseDTO updateBooking(@PathVariable Long id, @RequestBody BookingRequestDTO dto) {
        return bookingService.updateBooking(id, dto);
    }

    // PATCH /api/bookings/{id}/status — used by admin (COMPLETED) and user (CANCELLED)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateDTO dto) {
        try {
            return ResponseEntity.ok(bookingService.updateBookingStatus(id, dto.getStatus()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return "Booking deleted successfully!";
    }
}