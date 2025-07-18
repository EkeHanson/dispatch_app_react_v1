import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,  } from "react-router-dom";
import "./Adminpage2.css";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Managerlinkmodal from "../Copymanagermodal/Managerlinkmodal";
import { Button } from "react-bootstrap";
import config from '../../config';

const API_BASE_URL = `${config.API_BASE_URL}`;

const Adminpage2 = () => {

 
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [riderData, setRiderData] = useState([]);
  const [establishmentId, setEstablishmentId] = useState(null); // State to hold establishmentId

  const [formDataE, setFormDataE] = useState({
    name: "",
    contact_person: "",
    phone_number: "",
    rider: "",
    riderPhone: "",
    riderAddress: "",});

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
    created: new Date().toISOString(), // Set to the current date-time in ISO format
    series: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('trying to get riders')
        const riderResponse = await axios.get(`${API_BASE_URL}/rider/`);

        if (riderResponse.status === 200) {
          setRiderData(riderResponse.data);
        } else {
          console.error("Failed to fetch rider data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const handleChange = (e) => {
    console.log('Getting and Setting riders')
    const { name, value } = e.target;
    if (name === "rider") {
      const selectedRider = riderData.find((rider) => rider.id === parseInt(value, 10));
      if (selectedRider) {
        setFormDataE((prevData) => ({
          ...prevData,
          rider: selectedRider.id,
          riderPhone: selectedRider.phone,
          riderAddress: selectedRider.address,
        }));
      }
    } else {
      setFormDataE((prevData) => ({ ...prevData, [name]: value }));
      setFormDataO((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true);
      console.log("Starting handleSubmit");
      setShowModal(true);
  
      // Ensure riderId is added to formDataE
      const selectedRider = riderData.find((rider) => rider.id === parseInt(formDataE.rider, 10));
    if (selectedRider) {
      formDataE.rider = selectedRider.id;
    }

    const responseE = await axios.post(`${API_BASE_URL}/establishment/create/`, formDataE);
    console.log(responseE.data);

    if (responseE.status === 201) {
      console.log("Establishment data sent successfully!!");
      toast.success("Establishment data sent successfully!!");
      setEstablishmentId(responseE.data.id); // Set establishmentId with the response data
      console.log("establishmentId from the set")
      console.log(establishmentId)

    
      const updatedFormDataO = {
        ...formDataO,
        establishment: responseE.data.id,
      };
      
        // Use the establishment ID from the response or any other relevant data for the order creation
         // Assuming responseE.data has the establishment ID
        const responseO = await axios.post(`${API_BASE_URL}/order/create/`, updatedFormDataO);
  
        if (responseO.status === 201) {
         // console.log("Order data sent successfully!!");
          toast.success("Order data sent successfully!!");
          setShowModal(true);
        } else {
          console.error("Failed to send order data");
          toast.error("Failed to send order data");
        }
      } else {
        console.error("Failed to send establishment data");
        toast.error("Failed to send establishment data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Updated establishmentId:", establishmentId);
  }, [establishmentId]);

  console.log("User_type: " )

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="container-fluid add">
        <div className="pt-3 ps-5">
          <Link className="text-light text-decoration-none fs-5 ml-4" to="/rider-page">
            <i className="bi bi-chevron-left"></i> Go Back 
          </Link>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-6 col-sm-12 p-5">
            <h1 className="text-light text-center fw-bold">Lottery Company</h1>
          </div>
        </div>
      </div>
      <div className="row rounded-5 p-5 mt-3">
        <div className="header mt-5">
          <p className="fs-3 fw-bold">Establecimiento</p>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
       
          <div>
            <div className="row my-5 pt-3 align-items-center">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label htmlFor="contactPerson" className="mb-3">
                Establecimiento
                </label>
                <input
                  type="text"
                  name="name"
                  value={formDataE.name || ''}
                  onChange={handleChange}
                  className="form-control rounded-pill w-100 border-1 py-3 px-3 mb-4"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <label htmlFor="contactPerson" className="mb-3">
                  Persona de contacto
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formDataE.contact_person || ''}
                  onChange={handleChange}
                  className="form-control rounded-pill w-100 border-1 py-3 px-3"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <label htmlFor="phoneNumber" className="mb-3">
                  Telefono
                </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formDataE.phone_number || ''}
                    onChange={handleChange}
                    className="form-control rounded-pill w-100 border-1 py-3 px-3 "
                  />
              </div>
            </div>
          </div>

          {/* riders details */}
          <div className="row justify-content-center">
            <div className="">
              <div className="header mt-5">
                <p className="fs-3 fw-bold mt-4">Información del conductor</p>
              </div>
              <div className="mb-4 mt-5">
                <label htmlFor="name" className="mb-3">
                Seleccionar pasajero
                </label>
                <select
                  className="form-select rounded-pill w-100 border-1 py-3 px-3 numero"
                  aria-label="Rider" 
                  name="rider" 
                  value={formDataE.rider}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                  Seleccionar pasajero
                  </option>
                  {riderData.map((rider, index) => (
                  <option key={index} value={rider.id}>
                  {rider.first_name} {rider.last_name} - {rider.phone}
                  </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="row mt-5 pt-3">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="riderPhone" className="mb-3">
                    Telefono
                    </label>
                    <input
                      type="tel"
                      name="riderPhone"
                      value={formDataE.riderPhone}
                      onChange={handleChange}
                      readOnly={true}
                      className="form-control rounded-pill w-100 border-1 py-3 px-3"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="riderAddress" className="mb-3">
                    Direccion
                    </label>
                    <input
                      type="text"
                      name="riderAddress"
                      value={formDataE.riderAddress}
                      onChange={handleChange}
                      readOnly={true}
                      className="form-control rounded-pill w-100 border-1 py-3 px-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order */}
          <div className="container-fluid">
            <div className="header mt-5 pt-5">
              <p className="fs-3 fw-bold my-5">Detalles del pedido</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                <label htmlFor="orderNumber" className="fs-5 mb-2">
                  Numero
                </label>
                <input
                  type="text"
                  name="order_number"
                  value={formDataO.order_number}
                  onChange={handleChange}
                  className="form-control rounded-pill w-100 border-1 py-3 px-3"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                <label htmlFor="name" className="fs-5 mb-2">
                Cantidad reservada
                </label>
                <input
                  type="number"
                  name="reserved_quantity"
                  value={formDataO.reserved_quantity}
                  onChange={handleChange}
                  className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                <label htmlFor="name" className="fs-5 mb-2">
                Cantidad devuelta por la cliente 
                </label>
                <input
                  type="number"
                  name="amount_returned_by_customer"
                  value={formDataO.amount_returned_by_customer}
                  onChange={handleChange}
                  className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                <label htmlFor="name" className="fs-5 mb-2">
                Cantidad vendida
                </label>
                <input
                  type="number"
                  name="quantity_sold"
                  value={formDataO.quantity_sold}
                  onChange={handleChange}
                  className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                <label htmlFor="name" className="fs-5 mb-2">
                Cantidad cargada
                </label>
                <input
                  type="text"
                  name="amount_charged"
                  value={formDataO.amount_charged}
                  onChange={handleChange}
                  className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                <label htmlFor="name" className="fs-5 mb-2">
                 Regalo
                </label>
                <input
                  type="number"
                  name="gift_or_discount"
                  value={formDataO.gift_or_discount}
                  onChange={handleChange}
                  className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                />
              </div>
            </div>
            <div className="text-center mt-3">
               <Button variant="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="btn-link text-decoration-none text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5"
                  type="submit">
                  Ahorrar
                </Button>
             </div>
            
          </div>
        </div>
      </div>
      </form> 
     
        <Managerlinkmodal visible={showModal} onClose={() => setShowModal(false)} 
        establishmentId={establishmentId} />
 
      <Footer />
    </div>
  );
};

export default Adminpage2;