package com.bgbusiness.validator;

import com.bgbusiness.model.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;

        if(user.getPassword().length() < 8) {
            errors.rejectValue("password", "Length", "Password must be at least 8 characters");
        }

        if(!user.getPassword().equals(user.getPasswordConfirmation())) {
            errors.rejectValue("confirmPassword", "Match", "Password must match");

        }
    }
}
