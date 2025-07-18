import React, { useState, useEffect } from "react";
import axios from "axios";  
// eslint-disable-next-line
import img3 from "../Assets/Rectangle 21.png";
import img7 from "../Assets/Rectangle 21 (3).png";
import './Ridercompo.css';
import avatar from "../Assets/avatar.png";
import { Link } from "react-router-dom";
import Examplem from "../Modal2/Modal2";
import { jwtDecode } from 'jwt-decode';
import config from '../../config';

const API_BASE_URL = `${config.API_BASE_URL}`;


const Ridercompo = ({ onpageSwitch }) => {
  const [responseData, setResponseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    const authToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(authToken);
  
    try {
      const [riderResponse, adminResponse] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/rider`),
        axios.get(`${API_BASE_URL}/register/admins/${decodedToken.user_id}`),
      ]);
  
      if (riderResponse.status === 'fulfilled' && riderResponse.value.status === 200) {
        setResponseData(riderResponse.value.data);
      } else {
        alert('Failed to fetch rider data');
      }
  
      if (adminResponse.status === 'fulfilled' && adminResponse.value.status === 200) {
        setUserType(adminResponse.value.data.user_type);
      } else {
        alert('Failed to fetch admin data');
      }
    } catch (error) {
      alert('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const results = responseData.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, responseData]);

  if (userType !== 'admin') {
    return (
      <div>
        {/* <p>User_type: {userType}</p>
        <p>Access Denied. You do not have permission to view this page.</p>
        <div>
          <Link
            to="/"
            className="rounded-pill go-back py-2 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light"
          >
            Go back
          </Link>
        </div> */}
      </div>
    );
  }

  return (
    <div>
      <input
        type="search"
        className="form-control rounded-pill mt-5 py-3"
        placeholder="Buscar corredores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row mt-5 gy-4">
        <div className="rounded-5 overlay">
          {filteredData.map((item, index) => (
            <div key={index} className="container position-relative">
              {/* <img className="w-100 " src={img3} alt="" /> */}
              <img className="w-100" src={avatar} alt="" style={{ width: '150px', borderRadius: '40px' }} />
             
              <div className=" text-light fs-4 my-3">
                <Examplem
                  riderId={item.id}
                  last_name={item.last_name}
                  first_name={item.first_name}
                  phone={item.phone}
                />
              </div>
              <div className="position-absolute top-50 start-50 font translate-middle-x ms-sm-4 ms-lg-5 mx-md-auto text-light" style={{ transform: 'translate(-35%, 130%)' }}>
                {item.first_name} {item.last_name}
              </div>
            </div>
          ))}
          <div className="container">
            <img className="w-100 image img-fluid" src={img7} alt="" />
            <div className="middle">
              <div className="text">
                <Link to="/riders-details">
                  <i className="bi bi-plus-lg"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ridercompo;
