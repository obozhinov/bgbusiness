package com.bgbusiness.service;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.repository.AddressRepository;
import com.bgbusiness.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    @Autowired
    AddressRepository addressRepo;

    @Autowired
    BusinessRepository businessRepo;

    public Business saveOrUpdateBusiness(Business business) {
        //if address doesn't exists set up a new Address and add the relationship to both sides
        //catch an exception Business id doesn't exists
        return businessRepo.save(business);
    }

    public Business findById(long id) {
        return businessRepo.findById(id).get();
    }

    public void deleteBusiness(long id) {
        businessRepo.deleteById(id);
    }

    public Business addAddressToBusienss(long id, Address address) {
        Business business = businessRepo.findById(id).get();
        List<Address> addresses = business.getAddresses();
        for (Address a: addresses) {
            if (a == address) return business;
        }
        addresses.add(address);
        return businessRepo.save(business);
    }

    public Collection<Business> findAll() {
        return businessRepo.findAll().stream().collect(Collectors.toList());
    }

    public Collection<Address> findAllAddresses(long business_id) {
        return businessRepo.findById(business_id).get().getAddresses();
    }
}
