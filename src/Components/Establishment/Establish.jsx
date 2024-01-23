import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Establish.css';
import img4 from '../Assets/card img-1.png';
import img7 from '../Assets/Rectangle 21 (3).png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from '../Modal/Modal';
import { jwtDecode } from 'jwt-decode';

const Establish = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  const [responseData, setResponseData] = useState([]);
  const [userType, setUserType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const decodedToken = jwtDecode(authToken);

      try {
        const [response, response2] = await Promise.allSettled([
          axios.get(`${apiHostname}/establishment/`),
          axios.get(`${apiHostname}/register/admins/${decodedToken.user_id}`),
        ]);

        if (response.status === 'fulfilled' && response.value.status === 200) {
          setResponseData(response.value.data);

          if (response2.status === 'fulfilled' && response2.value.status === 200) {
            setUserType(response2.value.data.user_type);
          } else {
            setUserType(''); // Or any default value if needed
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const results = responseData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, responseData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userType !== 'admin') {
    return (
      <div>
        <p>Access Denied.</p>
        <p>You do not have permission to view this page.</p>
        <div>
          <Link to="/">Go to Login Page</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <input
        type="search"
        className="form-control rounded-pill mt-5 py-3"
        placeholder="Buscar establecimiento...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row mt-5 gy-4 justify-content-center align-items-center">
        <div className="rounded-5 overlay">
          {filteredData.map((item, index) => (
            <div key={index} className="container position-relative">
              <Link to={`/admin-page?establishmentId=${item.id}`}>
                <img className="w-100" src={img4} alt="" />
              </Link>
              <div className="text-light fs-4 my-3 mx-auto">
                <Example
                  establishmentId={item.id}
                  managerName={item.name}
                  managerPhone={item.phone_number}
                />
              </div>
              <div className="position-absolute top-50 start-50 translate-middle ms-sm-4 text-end mt-3 text-light">
                {item.name}
              </div>
              <div className="middle"></div>
            </div>
          ))}
          <div className="container">
            <img className="w-100 image" src={img7} alt="" />
            <div className="middle">
              <div className="text">
                <Link to="/create-company">
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

export default Establish;
