package com.bgbusiness.service;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.model.User;
import com.bgbusiness.repository.AddressRepository;
import com.bgbusiness.repository.BusinessRepository;
import com.bgbusiness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    @Autowired
    AddressRepository addressRepo;

    @Autowired
    BusinessRepository businessRepo;

    @Autowired
    UserRepository userRepository;

    public Business saveOrUpdateBusiness(Business business, String name) {
        User user = userRepository.findByUsername(name);
        if(business.getId() == null && !business.getUser().equals(user)) {
            new ResourceNotFoundException("Business not found in your account!");
        }
        business.setUser(user);
        return businessRepo.save(business);
    }

    public Business findById(long id, String username) {
        Business business = businessRepo.getById(id);
        if(business == null) {
            new ResourceNotFoundException("Business with id = " + id + " not found!");
        }
        if(!business.getUser().getUsername().equals(username)) {
            new ResourceNotFoundException("Business not found in your account!");
        }
        return business;
    }

    public void deleteBusiness(long id, String username) {
        businessRepo.deleteById(findById(id, username).getId());
    }

    public Business addAddressToBusienss(long id, Address address) {
        try {
            Business business = businessRepo.findById(id).get();
            List<Address> addresses = business.getAddresses();
            for (Address a : addresses) {
                if (a == address) return business;
            }
            addresses.add(address);
            business.setAddresses(addresses);
            return businessRepo.save(business);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Business with id = " + id + " not found!");
        }
    }

    public Collection<Business> findAll(String username) {
        User user = userRepository.findByUsername(username);
        return businessRepo.findAllByUser(user).stream().collect(Collectors.toList());
    }

    public Collection<Business> findAll() {
        return businessRepo.findAll().stream().collect(Collectors.toList());
    }

    public Collection<Address> findAllAddresses(long business_id, String username) {
        User user = userRepository.findByUsername(username);
        Business business = businessRepo.findById(business_id).get();
        if(!business.getUser().equals(user) || business == null) {
            new ResourceNotFoundException("Business not found in your account!");
        }
        return business.getAddresses();
    }

    public Collection<Business> filterByCountry(String country) {
        return businessRepo.findAllByAddressesAndCountry(country).stream().collect(Collectors.toList());
    }
}
