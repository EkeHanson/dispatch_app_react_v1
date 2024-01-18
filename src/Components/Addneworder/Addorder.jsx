import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Addorder.css";
import Successmodal from "../Successmodal/Successmodal";



const Addorder = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
      

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const establishmentId = queryParams.get("establishmentId");
  const parsedEstablishmentId = establishmentId ? parseInt(establishmentId, 10) : null


  useEffect(() => {
    console.log("Establishment ID:", establishmentId);
  }, [establishmentId]);

  const [formDataO, setFormDataO] = useState({
    order_number: "",
    reserved_quantity: 0,
    amount_returned_by_customer: 0,
    quantity_sold: 0,
    amount_charged: 0,
    gift_or_discount: 0,
    quantity_delivered: 0,
    amount_paid: 0,
    balance: 0,
    discount: 0,
    confirm: false,
    created: new Date().toISOString(), 
    series: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
  
    // Convert numeric fields to numbers
    if (['reserved_quantity', 'amount_returned_by_customer', 'amount_charged',].includes(name)) {
      parsedValue = parseInt(value, 10);
      // Check if parsing was successful, otherwise set it to zero
      parsedValue = isNaN(parsedValue) ? 0 : parsedValue;
    }
  
    // Convert boolean field to lowercase
    if (name === 'confirm') {
      parsedValue = value.toLowerCase() === 'true'; // Assuming 'true' or 'false' strings are sent
    }
  
    setFormDataO((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleSubmit = async () => {
    try {
      if (parsedEstablishmentId !== null) {
        const updatedFormDataO = {
          order_number: formDataO.order_number,
          reserved_quantity: parseInt(formDataO.reserved_quantity, 10),
          amount_returned_by_customer: parseInt(formDataO.amount_returned_by_customer, 10),
          quantity_sold: parseInt(formDataO.quantity_sold, 10),
          amount_charged: parseInt(formDataO.amount_charged, 10),
          gift_or_discount: parseInt(formDataO.gift_or_discount, 10),
          establishment: parsedEstablishmentId,
        };
  
        console.log("About to create an Order");
        const responseO = await axios.post(`${apiHostname}/order/create/`, updatedFormDataO);
        
  
        if (responseO.status === 201) {
          console.log("Order data sent successfully!!");
        }
      } else {
        console.error("Establishment ID is null");
        // Handle the case when establishmentId is null (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  

  return (
    
    <div>
      <div className="container-fluid bg bg-light">
        <div className="">
          <div className="pt-3 ps-5">
            <a className="text-light text-decoration-none fs-5 ml-4" href="/">
              <i className="bi bi-chevron-left"></i> Go Back
            </a>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-8 col-md-6 col-sm-12 p-5">
              <h1 className="text-light text-center fw-bold">
                Lottery Company
              </h1>
            </div>
          </div>
          <div className="text-end">
            <p className="mb-0 fs-5 text-light p-3">
              Dispatch Rider: <span className="fw-bold">Gloria Analaba</span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <h2 className="fw-bold fs-2 heading-1">Add new order</h2>
      </div>
      <div className="container-fluid px-3">
        <div className="header mt-5">
          <p className="fs-3 fw-bold">Order details</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Number
            </label>
            <input
              type="text"
              name="order_number"
              value={formDataO.order_number || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Reserved Quantity
            </label>
            <input
              type="Number"
              name="reserved_quantity"
              value={formDataO.reserved_quantity || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Amount returned by customer
            </label>
            <input
              type="Number"
              name="amount_returned_by_customer"
              value={formDataO.amount_returned_by_customer || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Quantity sold
            </label>
            <input
              type="text"
              name="quantity_sold"
              value={formDataO.quantity_sold || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Amount charger
            </label>
            <input
              type="Number"
              name="amount_charged"
              value={formDataO.amount_charged || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
            <label htmlFor="name" className="fs-5 mb-2">
              Gift/Discount
            </label>
            <input
              type="Number"
              name="gift_or_discount"
              value={formDataO.gift_or_discount || ''}
              onChange={handleChange}
              className="rounded-pill w-100 border-1 py-3 px-3 form-control"
            />
          </div>
        </div>
        <div className="text-center mt-3 w-75 mx-auto">

          <Successmodal handleSubmit={handleSubmit}/>
        </div>
      </div>
      <div className="container-fluid footer py-4 bg-light text-center mt-5 mb-0">
        <div className="row justify-content-center align-items-center ">
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

export default Addorder;
