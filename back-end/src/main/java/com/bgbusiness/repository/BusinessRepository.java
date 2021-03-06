package com.bgbusiness.repository;

import com.bgbusiness.model.Business;
import com.bgbusiness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {

    @Query("SELECT business FROM Business business LEFT JOIN business.addresses a WHERE business.id = a.business")
    List<Business> findAllByAddressesAndCountry(String country);

    @Query(
      value="SELECT * FROM BUSINESS WHERE fk_user = :userId",
      nativeQuery = true
    )
    List<Business> findAllByUser(Long userId);
    Business getById(Long id);
}
