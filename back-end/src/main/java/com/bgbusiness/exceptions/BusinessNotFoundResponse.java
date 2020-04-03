package com.bgbusiness.exceptions;

public class BusinessNotFoundResponse {

  String message;

  public BusinessNotFoundResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
