import React, { useState } from "react";
import "./Ownerslogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Ownerslogin = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [loading, setLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

    // Call the login API endpoint with formData
    try {
      const response = await axios.post(`${apiHostname}/jwt_token/`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      

      if (response.ok) {
        // Handle successful login
        const responseData = await response.json();
        console.log("Login successful:", responseData);
       navigate('/log-owner')
      } else {
        // Handle failed login
        console.error("Login failed:", response.status);
       
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }

  }

  return (
    <div>
      <div className="container-fluid owner-login">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7 col-sm-12">
            <div className="pt-5">
              <div className="card shadow rounded-4 px-5 pt-5 pb-0">
                <div className="header text-center">
                  <h2 className="fw-bold text-dark py-2 head">Owner Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="inputs">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="text-start">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded-pill w-100 form-control border-1 py-2 px-3"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="rounded-pill w-100 form-control border-1 py-2"
                        type="password"
                      />
                    </div>

                    <div className="mt-5 text-center">
                      {/* Log-owner */}
                      <button
                      type="submit"
                        to="/log-owner"
                        className="btn btn-primary w-75 rounded-pill py-2"
                      >
                        {loading ? "login in..." : "Login"}
                      </button>
                    </div>

                    <div className="text-center mt-5">
                      <p>
                        Not an owner?{" "}
                        <Link to="/Owner-login">Login as admin</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownerslogin;