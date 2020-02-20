package com.bgbusiness.service;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.model.User;
import com.bgbusiness.repository.AddressRepository;
import com.bgbusiness.repository.BusinessRepository;
import com.bgbusiness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRepository businessRepository;

    public Address saveOrUpdate(long business_id, Address address, String username) {
        User user = userRepository.findByUsername(username);
        Business business = businessRepository.findById(business_id).get();
        if(!business.getUser().equals(user)) {
            new ResourceNotFoundException("Business not found in your account!");
        }

        return businessRepository.findById(business_id).map(business1 -> {
            address.setBusiness(business);
            return addressRepository.save(address);
        }).orElseThrow(() -> new ResourceNotFoundException("Business " + business_id + " not found"));
    }

    public void deleteById(long id, long address_id, String username) {
        User user = userRepository.findByUsername(username);
        Business business = businessRepository.findById(id).get();
        if(!business.getUser().equals(user)) {
            new ResourceNotFoundException("Business not found in your account!");
        }

        addressRepository.deleteById(id);
    }


}
