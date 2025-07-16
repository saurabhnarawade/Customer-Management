import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CustomerForm() {
  const [customer, setCustomer] = useState({
    cusName: "",
    cusEmail: "",
    cusContact: "",
    cusAddress: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/find-customer/${id}`)
        .then(res => setCustomer(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!customer.cusName || !customer.cusEmail || !customer.cusContact || !customer.cusAddress) {
      alert("All fields are required!");
      return;
    }

    if (id) {
      axios.put(`http://localhost:8080/update-customer/${id}`, customer)
        .then(() => navigate("/"));
    } else {
      axios.post("http://localhost:8080/save-customer", customer)
        .then(() => navigate("/"));
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Customer</h2>
      <form onSubmit={handleSubmit}>
        <input name="cusName" value={customer.cusName} onChange={handleChange} placeholder="Name" /><br />
        <input name="cusEmail" value={customer.cusEmail} onChange={handleChange} placeholder="Email" /><br />
        <input name="cusContact" value={customer.cusContact} onChange={handleChange} placeholder="Contact" /><br />
        <input name="cusAddress" value={customer.cusAddress} onChange={handleChange} placeholder="Address" /><br />
        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default CustomerForm;
