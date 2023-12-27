import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import img1 from "../Assets/Rectangle 21 (2).png";
// import img2 from "../Assets/Rectangle 21 (1).png";
import img3 from "../Assets/Rectangle 21.png";
import img7 from "../Assets/Rectangle 21 (3).png";
import 'bootstrap/dist/css/bootstrap.min.css';
import Examplem from "../Modal2/Modal2";


const Ridercompo = ({onpageSwitch}) => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiHostname}/rider`);
  
        if (response.status === 200) {
          setResponseData(response.data);
          console.log(response.data)
          const authToken = localStorage.getItem("authToken");
          console.log("Token retrieved:", authToken);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
          <div key={index} class="container position-relative">
            <img className="w-100 " src={img3} alt="" />
            <div className=" text-light fs-4 my-3">
              <Examplem riderId={item.id} last_name = {item.last_name} first_name={item.first_name} phone = {item.phone}/>
              {/* <i class="position-absolute top-0 end-0 me-4 mt-3 bi bi-three-dots-vertical text-light btn-modal"></i> */}
            </div>
            <div className="position-absolute top-50 end-0 translate-middle mt-5 text-light">
            {item.first_name} {item.last_name} 
            </div>
            {/* <div className="middle">
              <div className="text">
                <Link to="/"></Link>
              </div>
            </div> */}
          </div>
          ))}
          <div class="container">
            <img className="w-100 image" src={img7} alt="" />
            <div className="middle">
              <div className="text">
                <Link to="/riders-details">
                  <i class="bi bi-plus-lg"></i>
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
