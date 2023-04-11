package com.example.restapi.model.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.restapi.model.endUser.EndUser;
import com.example.restapi.model.endUser.EndUserNotFoundException;
import com.example.restapi.model.endUser.EndUserRepository;

import jakarta.validation.Valid;

@RestController
public class TodoController {

  private TodoRepository todoRepository;
  private EndUserRepository endUserRepository;

  public TodoController(TodoRepository todoRepository, EndUserRepository endUserRepository) {
    this.todoRepository = todoRepository;
    this.endUserRepository = endUserRepository;
  }

  @GetMapping("/user/{userId}/todos")
  public List<Todo> getAllTodosByUser(@PathVariable String userId) {
    EndUser endUser = endUserRepository.findById(userId).orElse(null);
    if (endUser == null) {
      throw new EndUserNotFoundException(String.format("User %s not found.", userId));
    }
    return endUser.getTodos();
  }

  @GetMapping("/user/{userId}/todos/{todoId}")
  public Todo getTodoByUser(@PathVariable String userId, @PathVariable String todoId) {
    EndUser endUser = endUserRepository.findById(userId).orElse(null);
    if (endUser == null) {
      throw new EndUserNotFoundException(String.format("User %s not found.", userId));
    }
    Todo todo = todoRepository.findById(todoId).orElse(null);
    if (todo == null) {
      throw new TodoNotFoundException(String.format("User %s not found.", userId));
    }
    return todo;
  }

  @DeleteMapping("/user/{userId}/todos/{todoId}")
  public ResponseEntity<Void> deleteTodo(@PathVariable String userId, @PathVariable String todoId) {
    EndUser endUser = endUserRepository.findById(userId).orElse(null);
    if (endUser == null) {
      throw new EndUserNotFoundException(String.format("User %s not found.", userId));
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
    EndUser endUser = endUserRepository.findById(userId).orElse(null);
    if (endUser == null) {
      throw new EndUserNotFoundException(String.format("User %s not found.", userId));
    }
    Todo currentTodo = todoRepository.findById(todo.getId()).orElse(null);
    if (currentTodo == null) {
      throw new TodoNotFoundException(String.format("Todo %s not found.", userId));
    }
    todo.setEndUser(endUser);
    todoRepository.save(todo);
    return ResponseEntity.ok(todo);
  }

  @PostMapping("/user/{userId}/todos")
  public ResponseEntity<Todo> createTodo(@PathVariable String userId, @RequestBody Todo todo) {
    EndUser endUser = endUserRepository.findById(userId).orElse(null);
    if (endUser == null) {
      throw new EndUserNotFoundException(String.format("User %s not found.", userId));
    }
    todo.setEndUser(endUser);
    todoRepository.save(todo);
    return ResponseEntity.ok(todo);
  }

}
