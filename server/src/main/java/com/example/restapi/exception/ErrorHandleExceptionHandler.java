package com.example.restapi.exception;

import java.time.LocalDate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.restapi.model.endUser.EndUserNotFoundException;
import com.example.restapi.model.todo.TodoNotFoundException;

@ControllerAdvice
public class ErrorHandleExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<ErrorDetails> handleAllExceptions(Exception ex, WebRequest request) throws Exception {
    ErrorDetails errorDetails = new ErrorDetails(LocalDate.now(), ex.getMessage(), request.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR.value());
    return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(EndUserNotFoundException.class)
  public final ResponseEntity<ErrorDetails> handleEndUserNotFoundException(Exception ex, WebRequest request)
      throws Exception {
    ErrorDetails errorDetails = new ErrorDetails(LocalDate.now(), ex.getMessage(), request.getDescription(false),
        HttpStatus.NOT_FOUND.value());
    return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(TodoNotFoundException.class)
  public final ResponseEntity<ErrorDetails> handleTodoNotFoundException(Exception ex, WebRequest request)
      throws Exception {
    ErrorDetails errorDetails = new ErrorDetails(LocalDate.now(), ex.getMessage(), request.getDescription(false),
        HttpStatus.NOT_FOUND.value());
    return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails(LocalDate.now(), ex.getFieldError().getDefaultMessage(),
        request.getDescription(false),
        HttpStatus.NOT_FOUND.value());
    return new ResponseEntity<Object>(errorDetails, HttpStatus.BAD_REQUEST);
  }

}
