package com.bgbusiness.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="addresses")
public class Address {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String street;
    private String unit;
    @NotNull
    private String city;
    @NotNull
    private String country;
    private String zip;
    private String email;
    private String phone;
    private String website;
    private boolean baseOffice;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_business", updatable = false, nullable = false)
    @JsonBackReference
    private Business business;

    public Address() {}

    public Address(@NotNull String street, String unit, @NotNull String city, @NotNull String country, String zip, String email, String phone, String website, boolean baseOffice, Business business) {
        this.street = street;
        this.unit = unit;
        this.city = city;
        this.country = country;
        this.zip = zip;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.baseOffice = baseOffice;
        this.business = business;
    }

    public Address(long id, @NotNull String street, String unit, @NotNull String city, @NotNull String country, String zip, String email, String phone, String website, boolean baseOffice, Business business, Business business1) {
        this.id = id;
        this.street = street;
        this.unit = unit;
        this.city = city;
        this.country = country;
        this.zip = zip;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.baseOffice = baseOffice;
        this.business = business1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public boolean isBaseOffice() {
        return baseOffice;
    }

    public void setBaseOffice(boolean baseOffice) {
        this.baseOffice = baseOffice;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", unit='" + unit + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", zip='" + zip + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", website='" + website + '\'' +
                ", baseOffice=" + baseOffice +
                ", business=" + business +
                '}';
    }
}
