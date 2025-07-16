package com.ashdip.customer.repository;

import com.ashdip.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Long> {
    Customer findByCusContact(Long cusContact);
    boolean existsByCusContact(Long cusContact);
}
