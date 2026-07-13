import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Submitted:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" name="name" onChange={handleChange} required /><br /><br />

        <label>Email:</label><br />
        <input type="email" name="email" onChange={handleChange} required /><br /><br />

        <label>Password:</label><br />
        <input type="password" name="password" onChange={handleChange} required /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
