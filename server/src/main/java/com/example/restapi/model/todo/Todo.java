package com.example.restapi.model.todo;

import java.time.LocalDate;

import com.example.restapi.model.endUser.EndUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

@Entity
public class Todo {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @Size(min = 10, max = 150, message = "Size must between 10 and 150")
  private String description;
  private Boolean done;
  private Long date;
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  private EndUser endUser;

  public Todo() {
  }

  public Todo(String id, String description, Boolean done, Long date, EndUser endUser) {
    this.id = id;
    this.description = description;
    this.done = done;
    this.date = date;
    this.endUser = endUser;
  }

  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getdescription() {
    return this.description;
  }

  public void setdescription(String description) {
    this.description = description;
  }

  public Boolean isDone() {
    return this.done;
  }

  public Boolean getDone() {
    return this.done;
  }

  public void setDone(Boolean done) {
    this.done = done;
  }

  public Long getDate() {
    return this.date;
  }

  public void setDate(Long date) {
    this.date = date;
  }

  public EndUser getEndUser() {
    return this.endUser;
  }

  public void setEndUser(EndUser endUser) {
    this.endUser = endUser;
  }

}
