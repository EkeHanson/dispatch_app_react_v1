import React, { useState } from "react";
import "./Adminregister.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Ownerregister from "../Ownerregister/Ownerregister";

import config from '../../config';

const API_BASE_URL = `${config.API_BASE_URL}`;

const Adminregister = ({ onFormSwitch }) => {
  // const handleChangeState = (newState) => {
  //   setActiveState(newState);
  // };



// eslint-disable-next-line
  const [activeState, setActiveState] = useState("adminRegister");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "admin",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    user_type: "admin"
  });

  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);

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
      const response = await axios.post(
        `${API_BASE_URL}/register/user/create/`,
        formData
      );

      console.log("Registration successful:", response.data);
      if (response.data.user_type === "admin") {
        navigate("/admin-login");
      } else if (response.data.user_type === "owner") {
        navigate("/Owner-login");
      } else {
        console.error("Invalid user type");
      }
      console.log("Server Response:", response);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        console.error("Registration failed with status code:", status);
        console.error("Error data:", data);

        // Extract the first error message from the response
        let errorMsg = "Registration failed.";
        if (typeof data === "object") {
          const firstErrorField = Object.keys(data)[0];
          const firstErrorMsg = data[firstErrorField][0]; // usually an array
          errorMsg = `${firstErrorField}: ${firstErrorMsg}`;
        }

        setRegistrationError(errorMsg);
      } else if (error.request) {
        setRegistrationError("No response received from the server.");
      } else {
        setRegistrationError("An error occurred. Please try again.");
      }
    }
    finally {
      
   
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      await handleRegistration();
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      {activeState === "adminRegister" && (
        <div className="container-fluid register">
          <div className="row min-vh-100 align-items-center justify-content-center">
            <div className="col-lg-6 col-md-7 col-sm-12">
              <div className="card rounded-5 w-100 p-5 mx-auto shadow">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h2 className="text-center text-color">Administrador Registro</h2>
                  </div>

                  <div className="my-4">
                    <label className="my-2">Primer Nombre:</label>
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
                    <label className="my-2">Apellido:</label>
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
                    <label className="my-2"> Nombre de usuario: </label>
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
                    <label className="my-2">Dirección de correo electrónico: </label>
                    <br></br>
                    <input
                      className="rounded-pill w-100 py-2 px-2 border-0"
                      type="email"
                      name="email"
                      placeholder="El correo electrónico debe ser único."
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{errors.email}</span>
                  </div>

                  <div className="my-4">
                    <label className="my-2">Contraseña:</label>
                    <br />
                    <input
                      className="rounded-pill w-100 py-2 px-2 border-0"
                      type="password"
                      name="password"
                      placeholder="La contraseña debe tener al menos 8 caracteres"
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
                      {loading ? "Registrarse..." : "Registro"}
                    </button>
                  </div>
                  <div className="text-center">
                    <p>
                      No administración?{" "}
                      <Link
                        className="text-decoration-none"
                        onClick={() => onFormSwitch()} // Call onFormSwitch
                      >
                        Registro  propietario
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
              {errors.registration && (
                <p style={{ color: "red" }}>{errors.registration}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Adminregister;