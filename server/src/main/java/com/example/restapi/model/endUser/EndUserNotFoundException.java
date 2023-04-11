package com.example.restapi.model.endUser;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class EndUserNotFoundException extends RuntimeException {
  
    public EndUserNotFoundException(String message) {
      super(message);
    }
  
}
