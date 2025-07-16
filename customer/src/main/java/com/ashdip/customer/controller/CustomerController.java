package com.ashdip.customer.controller;

import com.ashdip.customer.entity.Customer;
import com.ashdip.customer.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerRepo customerRepo;


//    @PostMapping("/save-customer")
//    public Customer saveCustomer(@RequestBody Customer customer){
//        return customerRepo.save(customer);
//    }


    @PostMapping("/save-customer")
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer){
        if (customerRepo.existsByCusContact(customer.getCusContact())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Contact number already exists!");
        }
        return ResponseEntity.ok(customerRepo.save(customer));
    }



    @GetMapping("/customers")
    public List<Customer> getCustomer(){
        return customerRepo.findAll();
    }

    @GetMapping("/find-customer/{id}")
    public Customer getById(@PathVariable long id){
        return customerRepo.findById(id).orElse(null);
    }

    @PutMapping("/update-customer/{contact}")
    public Customer updateCustomer(@PathVariable Long contact,@RequestBody Customer newCus){
        Customer existingCus =customerRepo.findByCusContact(contact);
        existingCus.setCusName(newCus.getCusName());
        existingCus.setCusContact(newCus.getCusContact());
        existingCus.setCusEmail(newCus.getCusEmail());
        existingCus.setCusAddress(newCus.getCusAddress());

        return customerRepo.save(existingCus);

    }

    @DeleteMapping("/delete-customer/{contact}")
    public void deleteCustomer(@PathVariable long contact){
        Customer customer =customerRepo.findByCusContact(contact);
        if (customer != null) {
            customerRepo.delete(customer);
        }
    }
}
