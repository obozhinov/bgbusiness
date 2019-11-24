package com.bgbusiness.model;

import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Business {

    @Id
    @GeneratedValue
    private long id;
    @NotNull
    private String name;
    private String imagePath;
    private String description;
    private boolean hiring;
    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Address> addresses = new ArrayList<>();

    public Business() {}

    public Business(long id, @NotNull String name, String imagePath, String description, boolean hiring, List<Address> addresses) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.hiring = hiring;
        this.addresses = addresses;
    }

    public Business(@NotNull String name, String imagePath, String description, boolean hiring, List<Address> addresses) {
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.hiring = hiring;
        this.addresses = addresses;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    @Override
    public String toString() {
        return "Business{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", description='" + description + '\'' +
                ", hiring=" + hiring +
                ", addresses=" + addresses +
                '}';
    }
}
