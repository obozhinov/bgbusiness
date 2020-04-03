package com.bgbusiness.controller;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.repository.BusinessRepository;
import com.bgbusiness.service.AddressService;
import com.bgbusiness.service.BusinessService;
import com.bgbusiness.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/business")
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepo;

    @Autowired
    private BusinessService businessService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private ValidationErrorService validationService;

    @RequestMapping("/all")
    public Collection<Business> getAllBusinesses() {
        return businessService.findAll();
    }

    @RequestMapping("/all-for-user")
    public Collection<Business> getAllBusinessesForUser(Principal principal) {
        return businessService.findAll(principal.getName());
    }

    @PostMapping("")
    public ResponseEntity<?> createOrUpdateBusiness(@RequestBody Business business, BindingResult bindingResult, Principal principal) {
        ResponseEntity<?> errorMap = validationService.ValidationErrorService(bindingResult);
        if(errorMap != null) return errorMap;
        businessService.saveOrUpdateBusiness(business, principal);
        return new ResponseEntity<>(business, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id, Principal principal) {
        businessService.deleteBusiness(id, principal.getName());
        return new ResponseEntity<String>("Recipe with id = " + id + "was successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findBusinessById(@PathVariable long id, Principal principal) {
        Business business = businessService.findById(id, principal.getName());
        return new ResponseEntity<Business>(business, HttpStatus.OK);
    }

    @GetMapping("/{id}/address")
    public ResponseEntity<?> findAddressForBusiness(@PathVariable long id, Principal principal) {
        Collection<Address> addresses = businessService.findAllAddresses(id, principal.getName());
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @PostMapping("/{id}/address")
    public ResponseEntity<?> addAddress(@PathVariable long id, @RequestBody Address address, BindingResult bindingResult, Principal principal) {
        ResponseEntity<?> errorMap = validationService.ValidationErrorService(bindingResult);
        if(errorMap != null) return errorMap;
        Address a = addressService.saveOrUpdate(id, address, principal.getName());
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}/address/{address_id}")
    public ResponseEntity<?> deleteAddressById(@PathVariable long id, @PathVariable long address_id, Principal principal) {
        addressService.deleteById(id, address_id, principal.getName());
        return new ResponseEntity<>("Address with id = " + address_id + "was successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<?> getBusinessByCountry(@PathVariable String country) {
        businessService.filterByCountry(country);
        return new ResponseEntity<>(businessService.filterByCountry(country), HttpStatus.OK);
    }
}
