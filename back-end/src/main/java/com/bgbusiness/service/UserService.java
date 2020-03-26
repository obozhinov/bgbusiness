package com.bgbusiness.service;

import com.bgbusiness.model.User;
import com.bgbusiness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.ResourceResolver;

@Service
public class UserService {

    @Autowired
    private UserRepository userRespository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser) throws Exception {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setPasswordConfirmation("");
            return userRespository.save(newUser);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
