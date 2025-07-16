import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaUserPlus,
  FaEdit
} from "react-icons/fa";
import "./CustomerManager.css";

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    cusName: "",
    cusEmail: "",
    cusContact: "",
    cusAddress: ""
  });
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8080/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => alert("Fetch error"));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.cusName.trim()) {
      newErrors.cusName = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(form.cusName)) {
      newErrors.cusName = "Name must contain only letters and spaces";
    }

    if (!form.cusEmail.trim()) {
      newErrors.cusEmail = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.cusEmail)
    ) {
      newErrors.cusEmail = "Invalid email format";
    }

    if (!form.cusContact.toString().trim()) {
      newErrors.cusContact = "Contact is required";
    } else if (!/^\d{10}$/.test(form.cusContact)) {
      newErrors.cusContact = "Contact must be 10 digits";
    }

    if (!form.cusAddress.trim()) {
      newErrors.cusAddress = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const url = isUpdating
      ? `http://localhost:8080/update-customer/${form.cusContact}`
      : "http://localhost:8080/save-customer";
  
    axios[isUpdating ? "put" : "post"](url, form)
      .then(() => {
        fetchCustomers();
        setForm({
          cusName: "",
          cusEmail: "",
          cusContact: "",
          cusAddress: ""
        });
        setIsUpdating(false);
        setErrors({});
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const msg = error.response.data;
          if (typeof msg === 'string' && msg.includes("Contact number")) {
            setErrors({ cusContact: msg });
          } else {
            alert("Validation error: " + msg);
          }
        } else {
          alert("Error while saving/updating");
        }
      });
  };
  

  const handleDelete = (contact) => {
    axios
      .delete(`http://localhost:8080/delete-customer/${contact}`)
      .then(fetchCustomers)
      .catch(() => alert("Error deleting customer"));
  };

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleUpdateClick = (customer) => {
    setForm({
      cusName: customer.cusName,
      cusEmail: customer.cusEmail,
      cusContact: customer.cusContact,
      cusAddress: customer.cusAddress
    });
    setIsUpdating(true);
    setErrors({});
  };

  return (
    <div className="split-layout">
      {/* Left Form */}
      <div className="form-container">
        <h2>{isUpdating ? "Update Customer" : "Add Customer"}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            name="cusName"
            value={form.cusName}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.cusName && <p className="error">{errors.cusName}</p>}

          <input
            name="cusEmail"
            value={form.cusEmail}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.cusEmail && <p className="error">{errors.cusEmail}</p>}

          <input
            name="cusContact"
            value={form.cusContact}
            onChange={handleChange}
            placeholder="Contact"
            disabled={isUpdating}
          />
          {errors.cusContact && <p className="error">{errors.cusContact}</p>}

          <input
            name="cusAddress"
            value={form.cusAddress}
            onChange={handleChange}
            placeholder="Address"
          />
          {errors.cusAddress && <p className="error">{errors.cusAddress}</p>}

          <div className="form-actions">
            <button className="add-btn" type="submit">
              {isUpdating ? "Update Customer" : "Add Customer"}
            </button>
            {isUpdating && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setForm({
                    cusName: "",
                    cusEmail: "",
                    cusContact: "",
                    cusAddress: ""
                  });
                  setIsUpdating(false);
                  setErrors({});
                }}
              >
                Cancel Update
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Accordion List */}
      <div className="list-container">
        <h2>Customer List</h2>
        <div className="accordion-list">
          {customers.map((customer, index) => (
            <div
              className={`accordion-card ${
                expanded === index ? "expanded" : ""
              }`}
              key={customer.cusContact}
            >
              <div
                className="accordion-header"
                onClick={() => toggleExpand(index)}
              >
                <span>{customer.cusName}</span>
                {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              <div className="accordion-body">
                <p>Email: {customer.cusEmail}</p>
                <p>Phone: {customer.cusContact}</p>
                <p>Address: {customer.cusAddress}</p>
                <div className="action-buttons">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(customer)}
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(customer.cusContact)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerManager;
