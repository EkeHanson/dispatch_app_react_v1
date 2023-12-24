import React from "react";
import "./Login.css";
import Footer from '../Footer/Footer'
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="container-fluid login p-0">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card rounded-5 shadow-lg py-5 px-5 mb-5">
           
            
            <div className="my-4">
              <Link to="/main-register"
                type="submit"
                className="reg-btn w-100 text-center text-light text-decoration-none border-0 py-3 fw-bold rounded-pill"
              >
                Register
              </Link>
            </div>
            <hr className="w-75 mx-auto" />
            <div className="my-4">
              <Link to="/Admin-login"
                type="submit"
                className="log-btn w-100 border-0 py-3 text-center text-decoration-none fw-bold rounded-pill"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
