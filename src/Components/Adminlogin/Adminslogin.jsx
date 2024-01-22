import "./Adminslogin.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import Footer from "../Footer/Footer";
import axios from "axios";
import Ownerslogin from "../Ownerlogin/Ownerslogin";

const Adminslogin = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "admin",
  });
  const [activeState, setActiveState] = useState("adminLogin");
  const [loading, setLoading] = useState(false);

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
        // eslint-disable-next-line
        const responseData = response.data;

        const authToken = response.data.access;
        localStorage.setItem("authToken", authToken);

        if (formData.userType === "admin") {
          navigate("/rider-login");
        } else if (formData.userType === "owner") {
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

  const handleFormSwitch = (newState) => {
    setActiveState(newState);
  };

  return (
    <>
      {activeState === "adminLogin" && (
        <div className="container-fluid login">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className="col-lg-5 col-md-7 col-sm-12">
              <div className="pt-5">
                <div className="card shadow rounded-4 px-5 pt-5 pb-0">
                  <form onSubmit={handleSubmit}>
                    <div className="header text-center">
                      <h2 className="fw-bold text-dark py-2 head">Inicio de sesión de administrador</h2>
                    </div>
                    <div className="inputs">
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="text-start">
                        Dirección de correo electrónico
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
                        <label htmlFor="password">Contraseña</label>
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
                          No administración?{" "}
                          <Link
                            to="/Admin-login"
                            onClick={() => handleFormSwitch("ownerLogin")}
                          >
                            Login as propietario
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
      )}
      {activeState === "ownerLogin" && <Ownerslogin onFormSwitch={handleFormSwitch} />}
    </>
  );
};

export default Adminslogin;