import React, { useEffect, useState } from "react";
import "./Ownerslog.css";
import img4 from "../Assets/Circle chart.png";
import Currentdate from "../Currentdate/Currentdate";
import Managmentlog from "../Managementlog/Managmentlog";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import OwnerpageTable from "../Tables/OwnerpageTable";

const Ownerslog = () => {
  const [userType, setUserType] = useState("");
  const [user_id, setUser_id] = useState();
  const [invoiceData, setInvoiceData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [establishmentData, setEstablishmentData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [numberOfItemsToday, setNumberOfItemsToday] = useState("");
  const [numberOfItemsYesterday, setNumberOfItemsYesterday] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(authToken);
        setUser_id(decodedToken.user_id);

        const orderResponse = await axios.get(`${apiHostname}/order/`);
        const invoiceResponse = await axios.get(`${apiHostname}/invoice/`);
        const establishmentResponse = await axios.get(`${apiHostname}/establishment/`);
        const response2 = await axios.get(`${apiHostname}/register/owners/${decodedToken.user_id}`);
        
        if (orderResponse.status === 200) {
          setUserType(response2.data.user_type);

          const today = new Date();
          const todayDate = today.toISOString().split('T')[0];

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayDate = yesterday.toISOString().split('T')[0];

          const ordersCreatedToday = orderResponse.data.filter(
            (item) => item.created.substring(0, 10) === todayDate
          );

          const ordersCreatedYesterday = orderResponse.data.filter(
            (item) => item.created.substring(0, 10) === yesterdayDate
          );

          setInvoiceData(invoiceResponse.data);
          setOrderData(orderResponse.data);
          setEstablishmentData(establishmentResponse.data);
          setNumberOfItemsYesterday(ordersCreatedYesterday.length);
          setNumberOfItemsToday(ordersCreatedToday.length);
        } else {
          console.error("Failed to fetch establishment data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiHostname, user_id, userType]);

  const calculateTotalAmountPaid = () => {
    if (orderData.length === 0) {
      return 0;
    }
    const totalAmountPaid = invoiceData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.amount_paid);
    }, 0);
    return totalAmountPaid;
  };

  const calculateTotalReservedQuantity = () => {
    if (orderData.length === 0) {
      return 0;
    }
    const totalReservedQuantity = orderData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.reserved_quantity);
    }, 0);
    return totalReservedQuantity;
  };

  const calculateTotalQuantityDelivered = () => {
    if (orderData.length === 0) {
      return 0;
    }
    const totalQuantityDelivered = orderData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.quantity_sold);
    }, 0);
    return totalQuantityDelivered;
  };

  const calculateTotalEarnings = () => {
    if (orderData.length === 0) {
      return 0;
    }

    const totalEarnings = orderData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.quantity_sold);
    }, 0);
    return totalEarnings;
  };

  const calculateTotalDebts = () => {
    if (invoiceData.length === 0) {
      return 0;
    }

    const totalDebts = invoiceData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.balance);
    }, 0);
    return totalDebts;
  };

  // const totalDebt = calculateTotalReservedQuantity() - calculateTotalAmountPaid();

  const getSelectedEstablishment = () => {
    if (selectedOption === "Todo el establecimiento") {
      return (
        <div>
        <div className="row gy-4 justify-content-center">
          {/* Display details for all establishments */}
          <div className="row mt-5">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="fs-2 mt-5">Overview</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="text-dark mt-5 pt-3 text-normal text-end">
                  Fecha Uitima Entrega:{" "}
                  <span className="fw-bold">
                    <Currentdate />
                  </span>
                </p>
              </div>
            </div>
            

            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card w-100 plates p-5 d-flex justify-content-center rounded-5">
                <div className="row g-0 justify-content-center align-items-center text-center">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img className="img-fluid w-75" src={img4} alt="" />
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 text-light pt-4 px-auto">
                    <p className="text-light">Total earnings</p>
                    <h2>
                      <span className="success-class fw-bold">
                      &euro;{calculateTotalEarnings()}
                      </span>
                    </h2>
                    <p className="text-light">compared to 52,000 yesterday</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-6 col-md-12 col-sm-10 ">
              <div className="card w-100 plates p-5 d-flex justify-content-center rounded-5">
                <div className="row g-0row g-0 justify-content-center align-items-center text-center">
                  <div className="col-lg-6 col-sm-12 ">
                    <img className="img-fluid w-75" src={img4} alt="" />
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-10 text-light pt-4 px-auto">
                    <p className="text-light">Order trent</p>
                    <h2>

                      <span className="success-class fw-bold">{numberOfItemsToday} orders</span>
                    </h2>
                    <p className="text-light">compared to  {numberOfItemsYesterday}  yesterday</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row text-center mt-5 gy-4 mb-5 pb-5">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card plates rounded-4 w-100 py-3">
                  <h6 className="text-light">Total Amount Paid</h6>
                  <h1 className="text-light">&euro;{calculateTotalAmountPaid()}</h1>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card plates rounded-4 w-100 py-3">
                  <h6 className="text-light">Total debts</h6>
                  <h1 className="text-light own">&euro;{calculateTotalDebts()}</h1>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card plates rounded-4 w-100 py-3">
                  <h6 className="text-light">Total Amount Reserved</h6>
                  <h1 className="text-light">&euro;{calculateTotalReservedQuantity()}</h1>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card plates rounded-4 w-100 py-3">
                  <h6 className="text-light own">Total amount supplied</h6>
                  <h1 className="text-light">&euro;{calculateTotalQuantityDelivered()}</h1>
                </div>
              </div>
            </div>
            </div>
            <OwnerpageTable />
      <div className="container-fluid footer py-4 bg-light text-center mt-5 mb-0">
        <div className="row justify-content-center ">
          <div className="col-lg-4 col-md-12 col-sm-6">
            <p className="mb-0">
              <i className="bi bi-geo-alt-fill "></i>
              Avda de Espana 2428710-EL MOLAR (MADRID)
            </p>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-6">
            <i className="bi bi-telephone-fill"></i>+918410517
          </div>
          <div className="col-lg-4 col-md-12 col-sm-6">
            <i className="bi bi-envelope-at-fill"></i>
            <a href="/">loteriaelmolar@yahoo.es</a>
          </div>
        </div>
      </div>
      
    </div>
      );
    } else {
      const selectedEstablishment = establishmentData.find(
        (item) => `${item.name} - ${item.contact_person} - ${item.phone_number}` === selectedOption
      );
      if (selectedEstablishment) {
        return (
          <Managmentlog 
            selectedEstablishmentName={selectedEstablishment.name} 
            selectedEstablishmentId={selectedEstablishment.id}
          />
        );
      } else {
        return null;
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userType !== "owner") {
    return (
      <div>
        <p></p>
        <p>Acceso denegado. No tiene permiso para ver esta página.</p>
        <div>
          <Link to="/" className='rounded-pill go-back py-2 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>Go back to Login page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Rest of the JSX structure */}


      <div className="owner-bg p-5">
        <div className="row justify-content-center text-light">
          <div className="col-lg-7">
            <div className="text-light">
              <h3 className="fs-2 fw-bold text-light">Buenas Noches,</h3>
              <h1 className="fs-1 fw-bold text-light ml-5">
                Dunena De Loteria
              </h1>
            </div>
                        
          </div>
        </div>
        <div className="pt-3 ps-5">
          <Link to="/" className="text-light text-decoration-none fs-5 ml-4">
            <i className="bi bi-chevron-left"></i>Regresa
          </Link>
        </div>
      </div>




      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-lg-10 col-md-6 col-sm-12">
          <label htmlFor="establishment" className="fs-4 fw-normal mb-3">
          seleccione un establecimiento
          </label>
          <select
            className="form-select rounded-pill py-3"
            aria-label="Default select example"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option >Todo el establecimiento</option>
            {establishmentData.map((item, index) => (
              <option key={index} value={`${item.name} - ${item.contact_person} - ${item.phone_number}`}>
                {item.name} - {item.contact_person} - {item.phone_number}
              </option>
            ))}
          </select>

          {getSelectedEstablishment()}

        </div>
      </div>
    </div>
  );
};

export default Ownerslog;
