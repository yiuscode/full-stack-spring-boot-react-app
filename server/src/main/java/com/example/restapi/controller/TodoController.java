package com.example.restapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.restapi.exception.TodoNotFoundException;
import com.example.restapi.exception.UserNotFoundException;
import com.example.restapi.model.Todo;
import com.example.restapi.model.User;
import com.example.restapi.repository.TodoRepository;
import com.example.restapi.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
public class TodoController {

  private TodoRepository todoRepository;
  private UserRepository userRepository;

  public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }

  @GetMapping("/user/{userId}/todos")
  public List<Todo> getAllTodosByUser(@PathVariable String userId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new UserNotFoundException(String.format("User %s not found.", userId));
    }
    return user.getTodos();
  }

  @GetMapping("/user/{userId}/todos/{todoId}")
  public Todo getTodoByUser(@PathVariable String userId, @PathVariable String todoId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new UserNotFoundException(String.format("User %s not found.", userId));
    }
    Todo todo = todoRepository.findById(todoId).orElse(null);
    if (todo == null) {
      throw new TodoNotFoundException(String.format("User %s not found.", userId));
    }
    return todo;
  }

  @DeleteMapping("/user/{userId}/todos/{todoId}")
  public ResponseEntity<Void> deleteTodo(@PathVariable String userId, @PathVariable String todoId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new UserNotFoundException(String.format("User %s not found.", userId));
    }
    Todo todo = todoRepository.findById(todoId).orElse(null);
    if (todo == null) {
      throw new TodoNotFoundException(String.format("User %s not found.", userId));
    }
    todoRepository.delete(todo);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/user/{userId}/todos/{todoId}")
  public ResponseEntity<Todo> updateTodo(@PathVariable String userId, @RequestBody Todo todo) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new UserNotFoundException(String.format("User %s not found.", userId));
    }
    Todo currentTodo = todoRepository.findById(todo.getId()).orElse(null);
    if (currentTodo == null) {
      throw new TodoNotFoundException(String.format("Todo %s not found.", userId));
    }
    todo.setUser(user);
    todoRepository.save(todo);
    return ResponseEntity.ok(todo);
  }

  @PostMapping("/user/{userId}/todos")
  public ResponseEntity<Todo> createTodo(@PathVariable String userId, @RequestBody Todo todo) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new UserNotFoundException(String.format("User %s not found.", userId));
    }
    todo.setUser(user);
    todoRepository.save(todo);
    return ResponseEntity.ok(todo);
  }

}
