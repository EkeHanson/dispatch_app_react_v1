

// export default Ownerregister;
import React, { useState } from "react";
import "./Ownerregister.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Ownerregister = ({ onFormSwitch }) => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "owner", // Add userType field to the formData and set it to 'owner'
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    user_type: "owner"
  });

  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
      valid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
      valid = false;
    }

    if (!formData.username?.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      const updatedFormdata = {
        ...formData,
        user_type : "owner"
      }
      const response = await axios.post(
        `${apiHostname}/register/user/create/`,
        updatedFormdata
      );

      console.log("Registration successful:", response.data);
      navigate("/owner-login");
    } catch (error) {
      if (error.response) {
        console.error(
          "Registration failed with status code:",
          error.response.status
        );
        console.error("Error data:", error.response.data);
        setRegistrationError("Registration failed. Please try again.");
      } else if (error.request) {
        console.error("No response received from the server");
        setRegistrationError("No response received from the server.");
      } else {
        console.error("Error during request setup:", error.message);
        setRegistrationError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await handleRegistration();
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="container-fluid register">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-lg-6 col-md-7 col-sm-12">
          <div className="card rounded-5 w-100 p-5 mx-auto shadow">
            <form onSubmit={handleSubmit}>
              <div>
                <h2 className="text-center text-color">Owner Register</h2>
              </div>

              <div className="my-4">
                <label className="my-2">First Name:</label>
                <br />
                <input
                  className="rounded-pill w-100 py-2 px-2 border-0"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.first_name}</span>
              </div>

              <div className="my-4">
                <label className="my-2">Last Name:</label>
                <br />
                <input
                  className="rounded-pill w-100 py-2 px-2 border-0"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.last_name}</span>
              </div>

              <div className="my-4">
                <label className="my-2"> Username: </label>
                <br></br>
                <input
                  className="rounded-pill w-100 py-2 px-2 border-0"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.username}</span>
              </div>

              <div className="my-4">
                <label className="my-2">Email Address: </label>
                <br></br>
                <input
                  className="rounded-pill w-100 py-2 px-2 border-0"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.email}</span>
              </div>

              <div className="my-4">
                <label className="my-2">Password:</label>
                <br />
                <input
                  className="rounded-pill w-100 py-2 px-2 border-0"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.password}</span>
              </div>

              <div className="text-center my-5">
                <button
                  type="submit"
                  className="w-75 rounded-pill py-2 text-light butn-bg text-bold border-0"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              <div className="text-center">
                <p>
                  Not owner?{" "}
                  <Link
                    className="text-decoration-none"
                    onClick={onFormSwitch}
                  >
                    register as admin
                  </Link>
                </p>
              </div>

              {registrationError && (
                <div className="text-center mt-3">
                  <p style={{ color: "red" }}>{registrationError}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownerregister;