package com.example.restapi.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "my_user")
public class User {

  @Id
  private String Id;
  @Size(min = 5, max = 100, message = "Size must between 5 - 100")
  private String username;
  @Size(min = 8, max = 50, message = "Size must between 8 - 50")
  @JsonIgnore
  private String password;
  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Todo> todos;

  public User() {
  }

  public User(String Id, String username, String password, List<Todo> todos) {
    this.Id = Id;
    this.username = username;
    this.password = password;
    this.todos = todos;
  }

  public String getId() {
    return this.Id;
  }

  public void setId(String Id) {
    this.Id = Id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<Todo> getTodos() {
    return this.todos;
  }

  public void setTodos(List<Todo> todos) {
    this.todos = todos;
  }

}
