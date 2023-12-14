// import React, { useState } from "react";
// import "./Adminregister.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Adminregister = ({onFormSwitch}) => {
//     const [activeState, setActiveState] = useState('adminRegister')
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Reset validation error when the user starts typing
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { ...errors };

//     if (!formData.first_name.trim()) {
//       newErrors.first_name = "First Name is required";
//       valid = false;
//     }

//     if (!formData.last_name.trim()) {
//       newErrors.last_name = "First Name is required";
//       valid = false;
//     }

//     if (!formData.username.trim()) {
//       newErrors.username = "Email is required";
//       valid = false;
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleRegistration = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:9090/register/user/create",
//         formData
//       );

//       // Handle successful registration
//       console.log("Registration successful:", response.data);
      


//       // Assume the backend returns an authentication token
//       const authToken = response.data.token;

//       // Save the token to local storage or state for future API requests
//       localStorage.setItem("authToken", authToken);
//     } catch (error) {
//       if (error.response) {
//         // The request was made, but the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error(
//           "Registration failed with statu s code:",
//           error.response.status
//         );
//         console.error("Error data:", error.response.data);
//         setErrors({
//           ...errors,
//           registration: "Registration failed. Please try again.",
//         });
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received from the server");
//         setErrors({
//           ...errors,
//           registration: "No response received from the server.",
//         });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error during request setup:", error.message);
//         setErrors({
//           ...errors,
//           registration: "An error occurred. Please try again.",
//         });
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       await handleRegistration();
//       navigate('/Admin-login')
//     } else {
//       console.log("Form validation failed");
//     }
//   };

//   return (
//     <div className="container-fluid register">
//       <div className="row min-vh-100 align-items-center justify-content-center">
//         <div className="col-lg-6 col-md-7 col-sm-12">
//           <div className="card rounded-5 w-100 p-5 mx-auto shadow">
//             <form onSubmit={handleSubmit}>
//                 {activeState === "adminRegister" && (<div>
//                     <h2 className="text-center text-color">Admin Register</h2> 
//                 </div>)}
//                 {activeState === "ownerRegister" && (<div>
//                     <h2 className="text-center text-color">Owner Register</h2> 
//                 </div>)}
                
//               <div className="my-4">
//                 <label className="my-2">First Name:</label>
//                 <br />
//                 <input
//                   className="rounded-pill w-100 py-2 px-2"
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                 />

//                 <span style={{ color: "red" }}>{errors.first_name}</span>
//               </div>

//               <div className="my-4">
//                 <label className="my-2">Last Name:</label>
//                 <br />
//                 <input
//                   className="rounded-pill w-100 py-2 px-2"
//                   type="text"
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                 />

//                 <span style={{ color: "red" }}>{errors.last_name}</span>
//               </div>

//               <div className="my-4">
//                 <label className="my-2"> Username: </label>
//                 <br></br>
//                 <input
//                   className="rounded-pill w-100 py-2 px-2"
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//                 <span style={{ color: "red" }}>{errors.username}</span>
//               </div>

//               <div className="my-4">
//                 <label className="my-2">Email Address: </label>
//                 <br></br>
//                 <input
//                   className="rounded-pill w-100 py-2 px-2"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <span style={{ color: "red" }}>{errors.email}</span>
//               </div>

//               <div className="my-4">
//                 <label className="my-2">Password:</label>
//                 <br />
//                 <input
//                   className="rounded-pill w-100 py-2 px-2"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />

//                 <span style={{ color: "red" }}>{errors.password}</span>
//               </div>

//               <div className="text-center my-5">
//                 <button
//                   type="submit"
//                   className="w-75 rounded-pill py-2 text-light butn-bg text-bold"
//                 >
//                   Register
//                 </button>
//               </div>
//               {activeState === 'adminRegister' && <div className="text-center">
//                 <p>Not admin?{" "}
//                     <Link className="text-decoration-none"  onClick={() => setActiveState("ownerRegister")}> register as owner
//                    </Link> </p>
//               </div>}
//               {activeState === 'ownerRegister' && <div className="text-center">
//                 <p>Not admin?{" "}
//                     <Link className="text-decoration-none"  onClick={() => setActiveState("adminRegister")}> register as admin
//                    </Link> </p>
//               </div>}
             
//             </form>
//           </div>
//           {errors.registration && (
//             <p style={{ color: "red" }}>{errors.registration}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adminregister;


import React, { useState } from "react";
import "./Adminregister.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Loader from 'react-loader-spinner';

const Adminregister = ({ onFormSwitch }) => {
  const [activeState] = useState("adminRegister");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null); // State to hold th
  const [loading, setLoading] = useState(false); // State for loading
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset validation error when the user starts typing
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
      // setLoading(true); // Set loading to true when the registration process starts
      const response = await axios.post(
        "https://distachapp.onrender.com/register/user/create",
        formData
      );

      // Handle successful registration
      console.log("Registration successful:", response.data);
      navigate("/admin-login");
      console.log("Server Response:", response);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Registration failed with status code:",
          error.response.status
        );
        console.error("Error data:", error.response.data);
        setRegistrationError("Registration failed. Please try again.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        setRegistrationError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", error.message);
        setRegistrationError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
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
              {activeState === "adminRegister" && (
                <div>
                  <h2 className="text-center text-color">Admin Register</h2>
                </div>
              )}
              {activeState === "ownerRegister" && (
                <div>
                  <h2 className="text-center text-color">Owner Register</h2>
                </div>
              )}

              <div className="my-4">
                <label className="my-2">First Name:</label>
                <br />
                <input
                  className="rounded-pill w-100 py-2 px-2"
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
                  className="rounded-pill w-100 py-2 px-2"
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
                  className="rounded-pill w-100 py-2 px-2"
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
                  className="rounded-pill w-100 py-2 px-2"
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
                  className="rounded-pill w-100 py-2 px-2"
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
                  className="w-75 rounded-pill py-2 text-light butn-bg text-bold"
                  disabled={loading} // Use 'loading' directly without curly braces
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
              {activeState === "adminRegister" && (
                <div className="text-center">
                  <p>
                    Not admin?{" "}
                    <Link
                      className="text-decoration-none"
                      onClick={() => navigate("/owner-register")}
                    >
                      {" "}
                      register as owner
                    </Link>{" "}
                  </p>
                </div>
              )}
              {activeState === "ownerRegister" && (
                <div className="text-center">
                  <p>
                    Not admin?{" "}
                    <Link
                      className="text-decoration-none"
                      onClick={() => navigate("/admin-register")}
                    >
                      {" "}
                      register as admin
                    </Link>{" "}
                  </p>
                </div>
              )}
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
  );
};

export default Adminregister;
