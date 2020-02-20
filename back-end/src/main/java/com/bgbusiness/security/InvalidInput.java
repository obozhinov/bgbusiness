package com.bgbusiness.security;

public class InvalidInput {
    private String username;
    private String password;

    public InvalidInput() {
        this.username = "Invalid user name";
        this.password = "Invalid password";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
