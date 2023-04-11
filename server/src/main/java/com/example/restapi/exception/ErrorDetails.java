package com.example.restapi.exception;

import java.time.LocalDate;

public class ErrorDetails {
  private LocalDate timeStamp;
  private String message;
  private String details;
  private int error;

  public ErrorDetails(LocalDate timeStamp, String message, String details, int error) {
    this.timeStamp = timeStamp;
    this.message = message;
    this.details = details;
    this.error = error;
  }

  public LocalDate getTimeStamp() {
    return this.timeStamp;
  }

  public void setTimeStamp(LocalDate timeStamp) {
    this.timeStamp = timeStamp;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getDetails() {
    return this.details;
  }

  public void setDetails(String details) {
    this.details = details;
  }

  public int geterror() {
    return this.error;
  }

  public void seterror(int error) {
    this.error = error;
  }

}
