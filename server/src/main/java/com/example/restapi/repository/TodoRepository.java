package com.example.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restapi.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, String> {

}
