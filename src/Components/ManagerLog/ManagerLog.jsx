import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./ManagerLog.css"


const ManagerLog = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  const { establishmentId } = useParams();
  
  const [responseData, setResponseData] = useState([]);
  const [responseData0, setResponseData0] = useState([]);
  const [EstablishmentResponseData, setEstablishmentResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const establishmentId = params.get('establishmentId'); // Retrieve establishmentId from URL
    
            if (!establishmentId) {
              console.error('Establishment ID not found in URL');
              return;
            }
    
            console.log("Trying to fetch establishment by id:", establishmentId);
    
        const response1 = await axios.get(`${apiHostname}/establishment/${establishmentId}`);
        const response = await axios.get(`${apiHostname}/order/by_establishment/${establishmentId}`);
        const InvoiceResponse = await axios.get(`${apiHostname}/invoice/`);
        
  
        if (response.status === 200 && response1.status === 200) {
          setResponseData(response.data);
          setEstablishmentResponseData(response1.data);

          const newArray = response.data.map(item => item.id);

          if (InvoiceResponse.status === 200) {           

            const filteredArray = InvoiceResponse.data.filter(item => newArray.includes(item.order));
            
            console.log("newArray");
            console.log(newArray);

            console.log("InvoiceResponseData: ");
            console.log(InvoiceResponse.data);

            console.log("filteredArray");
            setResponseData0(filteredArray);
          } else {
            console.error("Failed to fetch invoice data");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [establishmentId]);
  



  return (
    <div className="container-fluid">
      <div className="manager-log">
        <div className="pt-3 ps-5">
          <a
            className="text-light text-decoration-none fs-5 ml-4 text-end"
            href="/"
          >
            <i className="bi bi-chevron-left text-danger"></i> Logout
          </a>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-6 col-sm-12 p-5">
            <p>Buenas noches,</p>
            <h1 className="text-light text-center fw-bold">
              {EstablishmentResponseData.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="">
          <div className="my-3 text-center">
            <h3 className="fw-bold fs-1 my-5">Order details</h3>
          </div>
          <div className=" w-100">
            <table className="table-1 table-bordered table-responsive align-middle w-100">
              <thead>
                <tr>
                  <th scope="col" className="p-4">
                    Date
                  </th>
                  {/* <th scope="col" className="p-4">
                    Number
                  </th> */}
                  <th scope="col" className="p-4">
                    Series
                  </th>
                  <th scope="col" className="p-4">
                    Quantity delivered
                  </th>
                  <th scope="col" className="p-4">
                    Amount paid
                  </th>
                  <th scope="col" className="p-4">
                    Balance
                  </th>
                  <th scope="col" className="p-4">
                    Discount
                  </th>

                  <th scope="col" className="p-4">
                    {/* <Link to="/pending">Pending <i class="bi bi-chevron-down"></i></Link> */}
                    Gift
                   
                  </th>
                </tr>
              </thead>
              <tbody className="text-center position-relative">
              {Array.isArray(responseData0) ? (responseData0.map((item, index) => (
              
                <tr key={index}>
                  <td  className="p-4 text-left">{(new Date(item.created)).getDate()}-{(new Date(item.created)).getMonth() + 1}-{(new Date(item.created)).getFullYear()}</td>
                  {/* <td className="p-4 text-center">{item.order_number}</td> */}
                  <td className="p-4 text-center">{item.series}</td>
                  <td className="p-4 text-center">{item.quantity_delivered}</td>
                  <td className="p-4 text-center">${item.amount_paid}</td>
                  <td className="p-4 text-center">${item.balance}</td>
                  <td className="p-4 text-center">${item.discount}</td>
                  <td className="p-5 text-center ">$GIFT NOT IN The Invoice API</td>
                   
                   <div className="position-relative re">

                    <div className="vertical-letters position-absolute">
                      <span>A</span>
                      <span>p</span>
                      <span>p</span>
                      <span>r</span>
                      <span>o</span>
                      <span>v</span>
                      <span>e</span>
                      <span>d</span>
                    </div>
                  </div>
                </tr>
               ))
               ) : (
                
                  <tr>
                    
                    <td className="p-4 text-center">{responseData['created']}</td>
                    <td className="p-4 text-center">{responseData['order_number']}</td>
                    <td className="p-4 text-center">{responseData['series']}</td>
                    <td className="p-4 text-center">{responseData['quantity_delivered']}</td>
                    <td className="p-4 text-center">{responseData['amount_paid']}</td>
                    <td className="p-4 text-center">{responseData['balance']}</td>
                    <td className="p-4 text-center">{responseData['discount']}</td>
                    <td className="p-5 text-center ">$GIFT NOT IN The Order API</td>
                    
                    <div className="position-relative re">

                      <div className="vertical-letters position-absolute">
                        <span>A</span>
                        <span>p</span>
                        <span>p</span>
                        <span>r</span>
                        <span>o</span>
                        <span>v</span>
                        <span>e</span>
                        <span>d</span>
                      </div>
                    </div>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container-fluid footer py-4 bg-light text-center mt-5 mb-0">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-6">
            <p className="mb-0">
              <i class="bi bi-geo-alt-fill "></i>
              Avda de Espana 2428710-EL MOLAR (MADRID) 
            </p>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-6">
            <i class="bi bi-telephone-fill"></i>+918410517
          </div>

          <div className="col-lg-4 col-md-12 col-sm-6">
            <i class="bi bi-envelope-at-fill"></i>
            <a href="/">loteriaelmolar@yahoo.es</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerLog;
