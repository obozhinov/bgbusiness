package com.bgbusiness.controller;

import com.bgbusiness.model.Address;
import com.bgbusiness.model.Business;
import com.bgbusiness.repository.BusinessRepository;
import com.bgbusiness.service.BusinessService;
import com.bgbusiness.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/business")
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepo;

    @Autowired
    private BusinessService businessService;

    @Autowired
    private ValidationErrorService validationService;

    @RequestMapping("/all")
    public Collection<Business> getAllBusinesses() {
        return businessService.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> createOrUpdateBusiness(@RequestBody Business business, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = validationService.ValidationErrorService(bindingResult);
        if(errorMap != null) return errorMap;

        businessService.saveOrUpdateBusiness(business);
        return new ResponseEntity<>(business, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        businessService.deleteBusiness(id);
        return new ResponseEntity<String>("Recipe with id = " + id + "was successfuly deleted!", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findBusinessById(@PathVariable long id) {
        Business business = businessService.findById(id);
        return new ResponseEntity<Business>(business, HttpStatus.OK);
    }

    @GetMapping("/{id}/address")
    public ResponseEntity<?> findAddressForBusiness(@PathVariable long id) {
        Collection<Address> addresses = businessService.findAllAddresses(id);
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }
}
