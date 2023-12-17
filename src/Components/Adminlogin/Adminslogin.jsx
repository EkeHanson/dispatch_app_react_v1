import "./Adminslogin.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

const Adminslogin = ({ onformSwitch }) => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [activeState, setActiveState] = useState('adminLogin'); // Add state for activeState
  const [loading, setLoading] = useState(false); // State for loading

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
            const response = await axios.post(`${apiHostname}/jwt_token/`, formData);
      

      if (response.status === 200) {

        // Handle successful login
        const responseData = response.data; // Assuming the token data is in response.data
        console.log("Login successful:", responseData);
        
        // Handle successful registration
        console.log("Registration successful: See Access Token:", response.data.access);

        // Assume the backend returns an authentication token
        const authToken = response.data.access;
        localStorage.setItem("authToken", authToken);
        
        
        // Redirect or navigate to a new route upon successful login
        navigate('/rider-page'); // Replace '/dashboard' with your desired route after login
      } else {
        // Handle failed login
        console.error("Login failed:", response.status);
        navigate('/Rider-login');
    
      }
    } catch (error) {
      console.error("Error during login:", error);
    }finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <>
      <div className="container-fluid login">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7 col-sm-12">
            <div className="pt-5">
              <div className="card shadow rounded-4 px-5 pt-5 pb-0">
                <form action="#" onSubmit={handleSubmit}>
                  {activeState === "adminLogin" && (<div className="header text-center">
                    <h2 className="fw-bold text-dark py-2 head">Admin Login</h2>
                  </div>)}

                 {activeState === "ownerLogin" && (<div className="header text-center">
                    <h2 className="fw-bold text-dark py-2 head">Owner Login</h2>
                  </div>)}
                  <div className="inputs">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-start">
                        Email address
                      </label>
                      <input required
                        value={formData.email} onChange={handleChange}
                        type="email"
                        className="rounded-pill w-100 form-control border-1 py-2 px-3"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input required
                        value={formData.password} onChange={handleChange}
                        className="rounded-pill w-100 form-control border-1 py-2"
                        type="password"
                        id="password"
                        name="password"
                      />
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        type="submit"
                        disabled={loading} // Use 'loading' directly without curly brace
                        className="btn btn-primary w-75 rounded-pill py-2"

                      >
                        {loading ? "login in..." : "Login"}
                      </button>
                    </div>

                    {activeState === "adminLogin" && <div className="text-center mt-5">
                      <p>
                        Not an admin?{" "}
                        <Link
                          // to="/Admin-login"
                          onClick={() => setActiveState("ownerLogin")}
                        >
                          Login as owner
                        </Link>
                      </p>
                    </div>}
                    {activeState === "ownerLogin" && <div className="text-center mt-5">
                      <p>
                        Not an owner?{" "}
                        <Link
                          // to="/Admin-login"
                          onClick={() => setActiveState("adminLogin")}
                        >
                          Login as Admin
                        </Link>
                      </p>
                    </div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};


export default Adminslogin;