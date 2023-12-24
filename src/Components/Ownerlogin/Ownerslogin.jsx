import React, { useState } from "react";
import "./Ownerslogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Ownerslogin = ({ onFormSwitch }) => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "owner",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiHostname}/jwt_token/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData = response.data;
        console.log("Login successful:", responseData);

        const authToken = response.data.access;
        localStorage.setItem("authToken", authToken);

        if (formData.user_type === "admin") {
          navigate("/admin-login");
        } else if (formData.user_type === "owner") {
          navigate("/log-owner");
        } else {
          alert("Invalid user");
        }
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
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
                      Email address
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
                    <button
                      type="submit"
                      className="btn btn-primary w-75 rounded-pill py-2"
                      disabled={loading}
                    >
                      {loading ? "Login in..." : "Login"}
                    </button>
                  </div>
                  <div className="text-center mt-5">
                    <p>
                      Not an owner?{" "}
                      <Link to="/Admin-login" onClick={() => onFormSwitch("adminLogin")}>
                        Login as admin
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownerslogin;