package com.ashdip.customer.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long cusID;

    private String cusName;

    @Column(unique = true, nullable = false)
    private long cusContact;

    private String cusAddress;

    private String cusEmail;

    public long getCusID() {
        return cusID;
    }

    public void setCusID(long cusID) {
        this.cusID = cusID;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

    public Long getCusContact() {
        return cusContact;
    }

    public void setCusContact(Long cusContact) {
        this.cusContact = cusContact;
    }

    public String getCusAddress() {
        return cusAddress;
    }

    public void setCusAddress(String cusAddress) {
        this.cusAddress = cusAddress;
    }

    public String getCusEmail() {
        return cusEmail;
    }

    public void setCusEmail(String cusEmail) {
        this.cusEmail = cusEmail;
    }
}
