import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:8080/delete-customer/${id}`)
      .then(() => setCustomers(customers.filter(c => c.id !== id)));
  };

  return (
    <div>
      <h2>Customer List</h2>
      <button onClick={() => navigate("/add")}>Add Customer</button>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.cusName} - {c.cusEmail}
            <button onClick={() => navigate(`/edit/${c.id}`)}>Edit</button>
            <button onClick={() => deleteCustomer(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
