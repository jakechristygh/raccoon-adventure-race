import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    confirm_email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    zip_code: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirm_email) {
      setMessage("Emails do not match.");
      return;
    }

    const {confirm_email, ...payload } = formData;

    try {
      const response = await fetch("http://localhost:8000/api/registrations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          confirm_email: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
          country: "",
          state: "",
          zip_code: "",
        });
      } else {
        const data = await response.json();
        setMessage("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Two-column row: First Name / Last Name */}
        <div className="form-row">
          <label>
            First Name:
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Confirm Email:
          <input type="email" name="confirm_email" value={formData.confirm_email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>

        <label style={{ textAlign: "center"}}>

          Gender
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>
        </label>

        {/* Address Group */}
        <fieldset className="address-group">
          <legend>Address Information</legend>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>

          {/* Two-column row: Country / State / Zip */}
          <div className="form-row">
            <label>
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <label>
              State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </label>
            <label>
              Zip Code:
              <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} required />
            </label>
          </div>
        </fieldset>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
