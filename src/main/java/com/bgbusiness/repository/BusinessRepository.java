package com.bgbusiness.repository;

import com.bgbusiness.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends JpaRepository<Business, Long> {
}
