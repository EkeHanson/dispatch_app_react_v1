import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Managmentlog.css";

const Managmentlog = ({ selectedEstablishmentId, selectedEstablishmentName }) => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  const [orderData, setOrderData] = useState([]);
  // eslint-disable-next-line
  const [establishmentData, setEstablishmentData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch establishment data by ID
        const establishmentResponse = await axios.get(`${apiHostname}/establishment/${selectedEstablishmentId}`);
        setEstablishmentData(establishmentResponse.data);

        // Fetch order data by establishment
        const orderResponse = await axios.get(`${apiHostname}/order/by_establishment/${selectedEstablishmentId}`);
        // Filter orders related to the selected establishment
        const filteredOrderData = orderResponse.data.filter(order => order.establishment === selectedEstablishmentId);
        setOrderData(filteredOrderData);

        // Fetch all invoices
        const invoiceResponse = await axios.get(`${apiHostname}/invoice`);
        // Filter invoices related to the selected establishment
        const filteredInvoiceData = invoiceResponse.data.filter(invoice => {
          const order = filteredOrderData.find(order => order.id === invoice.order);
          return order && order.establishment === selectedEstablishmentId;
        });
        setInvoiceData(filteredInvoiceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiHostname, selectedEstablishmentId]);

 

  return (
    <div className="container-fluid">

      
      <div className="manager-log">
        {/* <div className="pt-3 ps-5">
          <a
            className="text-light text-decoration-none fs-5 ml-4 text-end"
            href="/"
          >
            <i className="bi bi-chevron-left text-danger"></i> Logout
          </a>
        </div> */}
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-6 col-sm-12 p-5">
            <p>Buenas noches,</p>
            <h1 className="text-light text-center fw-bold">
              {selectedEstablishmentName}
            </h1>
          </div>
        </div>
      </div>

      
      <div className="row">
        <div className="">
          <div className="my-3 text-center">
            <h3 className="fw-bold fs-1 my-5">Detalles del pedido</h3>
          </div>
          <div className=" w-100">
            <div className="table-responsive">
            <table className="table-1 table-bordered table-responsive align-middle w-100">
              <thead>
                <tr>
                  <th scope="col" className="p-4">
                  Fecha
                  </th>
                  <th scope="col" className="p-4">
                  Número
                  </th>
                  <th scope="col" className="p-4">
                    Serie
                  </th>
                  <th scope="col" className="p-4">
                  Cantidad entregada
                  </th>
                  <th scope="col" className="p-4">
                  Cantidad pagada
                  </th>
                  <th scope="col" className="p-4">
                  differential
                  </th>
                  <th scope="col" className="p-4">
                  Descuento
                  </th>

                  {/* <th scope="col" className="p-4"> */}
                    {/* <Link to="/pending">Pending <i class="bi bi-chevron-down"></i></Link> */}
                    {/* Gift */}
                   
                  {/* </th> */}
                </tr>
              </thead>
              <tbody className="text-center position-relative">
                
              {Array.isArray(invoiceData) ? (invoiceData.map((item, index) => (
              
                <tr key={index}>
                  <td  className="p-4 text-left">{(new Date(item.created)).getDate()}-{(new Date(item.created)).getMonth() + 1}-{(new Date(item.created)).getFullYear()}</td>
                  <td className="p-4 text-center">{orderData.length > 0 && orderData[0].order_number !== undefined
                      ? orderData[0].order_number
                      : ''}
                  </td>
                  <td className="p-4 text-center">{item.series}</td>
                  <td className="p-4 text-center">{item.quantity_delivered}</td>
                  <td className="p-4 text-center">${item.amount_paid}</td>
                  <td className="p-4 text-center">${item.balance}</td>
                  <td className="p-4 text-center">${item.discount}</td>
                   <td className="vertical-letters" >
                        <span>A</span>
                        <span>p</span>
                        <span>p</span>
                        <span>r</span>
                        <span>0</span>
                        <span>v</span>
                        <span>e</span>
                        <span>d</span>
                  </td>
                </tr>
               ))
               ) : (
                
                  <tr>
                    
                    <td className="p-4 text-center">{invoiceData['created']}</td>
                    <td className="p-4 text-center">{orderData[0].order_number}</td>
                    <td className="p-4 text-center">{invoiceData['series']}</td>
                    <td className="p-4 text-center">{invoiceData['quantity_delivered']}</td>
                    <td className="p-4 text-center">{invoiceData['amount_paid']}</td>
                    <td className="p-4 text-center">{invoiceData['balance']}</td>
                    <td className="p-4 text-center">{invoiceData['discount']}</td>
                    
                    
                  </tr>
                )}
              </tbody>
            </table>
            </div>
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

export default Managmentlog;
