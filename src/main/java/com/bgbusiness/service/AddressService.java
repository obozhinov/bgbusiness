package com.bgbusiness.service;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.repository.AddressRepository;
import com.bgbusiness.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private BusinessRepository businessRepository;

    public Address save(long business_id, Address address) {
        //do we have a business that exists to witch we can assign the address throw an exception
        return businessRepository.findById(business_id).map(business -> {
            address.setBusiness(business);
            return addressRepository.save(address);
        }).orElseThrow(() -> new ResourceNotFoundException("Business " + business_id + " not found"));
    }

    public void deleteById(long id) {
        addressRepository.deleteById(id);
    }


}
