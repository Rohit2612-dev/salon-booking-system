package com.example.salon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.salon.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
