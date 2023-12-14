import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Establish.css';
import img4 from '../Assets/card img-1.png';
import img7 from '../Assets/Rectangle 21 (3).png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from '../Modal/Modal';

const Establish = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://distachapp.onrender.com/establishment/');

        if (response.status === 200) {
          setResponseData(response.data);
          console.log(response.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="row mt-5 gy-4">
        <div className="rounded-5 overlay">
          {responseData.map((item, index) => (
            <div key={index} className="container position-relative">
              <Link to={`/admin-page?establishmentId=${item.id}`}>
                <img className="w-100 " src={img4} alt="" />
              </Link>
              <div className="text-light fs-4 my-3">
                <Example establishmentId={item.id} />
              </div>
              <div className="position-absolute top-50 end-0 translate-middle mt-5 text-light">
                {item.name} 
              </div>
              <div className="middle"></div>
            </div>
          ))}
          <div className="container">
            <img className="w-100 image" src={img7} alt="" />
            <div className="middle">
              <div className="text">
                <Link to="/edit-company">
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
