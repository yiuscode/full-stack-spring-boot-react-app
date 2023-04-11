package com.example.restapi.model.endUser;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.restapi.model.todo.Todo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;

@Entity
public class EndUser {

  @Id
  private String Id;
  @Size(min = 5, max = 100, message = "Size must between 5 - 100")
  private String userName;
  @Size(min = 8, max = 50, message = "Size must between 8 - 50")
  private String password;
  @OneToMany(mappedBy = "endUser")
  @JsonIgnore
  private List<Todo> todos;

  public EndUser() {
  }

  public EndUser(String Id, String userName, String password, List<Todo> todos) {
    this.Id = Id;
    this.userName = userName;
    this.password = password;
    this.todos = todos;
  }

  public String getId() {
    return this.Id;
  }

  public void setId(String Id) {
    this.Id = Id;
  }

  public String getUserName() {
    return this.userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
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
