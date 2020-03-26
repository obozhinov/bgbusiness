package com.bgbusiness.controller;

import com.bgbusiness.model.User;
import com.bgbusiness.payload.JWTLoginSuccessResponse;
import com.bgbusiness.payload.LoginRequest;
import com.bgbusiness.security.JwtTokenProvider;
import com.bgbusiness.service.UserService;
import com.bgbusiness.service.ValidationErrorService;
import com.bgbusiness.service.MapValidationErrorService;
import com.bgbusiness.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.bgbusiness.service.SecurityConstants.TOKEN_PREFIX;

@RestController
public class UserController {

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticatedUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) throws Exception {
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}
