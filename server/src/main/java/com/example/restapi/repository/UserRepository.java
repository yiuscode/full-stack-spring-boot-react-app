package com.example.restapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restapi.model.User;

public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByUsername(String username);
}
