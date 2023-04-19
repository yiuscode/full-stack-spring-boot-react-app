package com.example.restapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.restapi.dto.UserLoginRequest;
import com.example.restapi.model.User;
import com.example.restapi.service.UserService;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
    User user = userService.findByUsername(loginRequest.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getPassword().equals(loginRequest.getPassword())) {
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.status(401).body("Invalid credentials");
    }
  }
}