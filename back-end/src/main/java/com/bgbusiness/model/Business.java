package com.bgbusiness.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Business {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    private String imagePath;
    private String description;
    private boolean hiring;
    private String email;
    private String phone;
    private String website;
    @OneToMany(cascade = CascadeType.REFRESH, orphanRemoval = true, mappedBy = "business", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Address> addresses = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_user", updatable = false, nullable = false)
    @JsonBackReference
    private User user;

    public Business() {}

    public Business(Long id, @NotNull String name, String imagePath, String description, boolean hiring, String email, String phone, String website, List<Address> addresses, User user) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.hiring = hiring;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.addresses = addresses;
        this.user = user;
    }

    public Business(@NotNull String name, String imagePath, String description, boolean hiring, String email, String phone, String website, List<Address> addresses, User user) {
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.hiring = hiring;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.addresses = addresses;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isHiring() {
        return hiring;
    }

    public void setHiring(boolean hiring) {
        this.hiring = hiring;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    @Override
    public String toString() {
        return "Business{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", description='" + description + '\'' +
                ", email=" + email +
                ", phone=" + phone +
                ", website=" + website +
                ", hiring=" + hiring +
                ", addresses=" + addresses +
                '}';
    }
}
