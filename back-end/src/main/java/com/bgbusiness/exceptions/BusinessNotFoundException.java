package com.bgbusiness.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BusinessNotFoundException extends RuntimeException {
  public BusinessNotFoundException(String message) {
    super(message);
  }
}
