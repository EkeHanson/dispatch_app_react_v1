import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lotery.css";
import ResponsiveExample from "../Tables/ResponsiveExample";
// import Successmodal2 from "../Successmodal2/Successmodal2";

const Lotery = () => {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [responseData, setResponseData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [ordersData, setOrdersData] = useState([]); // Add state for ordersData
  const [defaultSelectedOrder, setDefaultSelectedOrder] = useState(""); // State to hold the default selected order number
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    phone_number: "",
    rider: "",
    riderPhone: "",
    riderAddress: "",
    order_number: "",
    reserved_quantity: "",
    amount_returned_by_customer: "",
    quantity_sold: "",
    amount_charged: "",
    gift_or_discount: "",
    created: "",
    series: "",
    quantity_delivered: "",
    amount_paid: "",
    balance: "",
    discount: "",
    confirm: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiHostname}/establishment/`);
        console.log(response)
        if (response.status === 200) {
          setResponseData(response.data);
          console.log(response.data);
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

  useEffect(() => {
    // Fetch orders data and set default selected order number
    const fetchOrdersByEstablishment = async () => {
      try {
        if (selectedId) {
          const ordersResponse = await axios.get(`${apiHostname}/order/by_establishment/${selectedId}`);
          if (ordersResponse.status === 200) {
            const orderDetailsArray = ordersResponse.data;

            if (orderDetailsArray.length > 0) {
              setOrdersData(orderDetailsArray); // Set the order details array in state
              // Set the default selected order number (here, choosing the first order number as default)
              setDefaultSelectedOrder(orderDetailsArray[0].order_number);
            } else {
              console.error('No orders found');
            }
          } else {
            console.error('Failed to fetch orders data');
          }
        }
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

    fetchOrdersByEstablishment();
  }, [selectedId, apiHostname]);

  useEffect(() => {
    if (defaultSelectedOrder) {
      const selectedOrder = ordersData.find((item) => item.order_number === defaultSelectedOrder);

      if (selectedOrder) {
        setFormData({
          ...selectedOrder,
          confirm: false, // Ensure any additional fields are set correctly
        });
      } else {
        console.error('Default selected order not found');
      }
    }
  }, [defaultSelectedOrder, ordersData]);
  
  // Update handleChange function to handle selecting orders
  const handleOrderSelect = (e) => {
    const selectedOrderNumber = e.target.value;
    const selectedOrder = ordersData.find(item => item.order_number === selectedOrderNumber);

    if (selectedOrder) {
      setSelectedOrderId(selectedOrder.id); // Set the ID of the selected order
      setFormData({
        ...selectedOrder,
        confirm: false, // Ensure any additional fields are set correctly
      });
    } else {
      alert('Selected order number not found');
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e) => {

    try {
      const selectedIndex = e.target.options.selectedIndex;
      const selectedData = responseData[selectedIndex - 1];


      if (selectedData) {
        setSelectedId(selectedData.id);


  
    setFormData((prevData) => ({
      ...prevData,
      name: selectedData ? selectedData.name : "",
      contact_person: selectedData ? selectedData.contact_person : "",
      phone_number: selectedData ? selectedData.phone_number : "",
 
    }));
  }
} catch (error) {
  alert("Error handling select change:", error);
}
};


  return (
    <div>
      <div className="container-fluid">
        <div className="lotery">
          <div className="lot">
            <div className="pt-3 ps-5">
              <a className="text-light text-decoration-none fs-5 ml-4" href="/">
                <i className="bi bi-chevron-left"></i> Go Back
              </a>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-8 col-md-6 col-sm-12 p-5">
                <h1 className="text-light text-center fw-bold">
                  LOTTERY DELIVERY RECEIPT
                </h1>
                <p className="text-center text-light mt-3">
                  Please fill in the details below
                </p>
              </div>
            </div>
          </div>

          <div className="row rounded-5 justify-content-center w-100 p-5 mt-3 px-5">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="mb-4">
                <label htmlFor="name" className="mb-3">
                  Establecimiento
                </label>
                <select
                  className="form-select rounded-pill w-100 border-1 py-3 px-3"
                  aria-label="Default select example"
                  onChange={handleSelectChange}
                >
                  <option value="selected_establishment">Select Establishment</option>
                  {Array.isArray(responseData) && responseData.map((item, index) => (
                    <option key={index} value="select_establishment">
                      {item.name} {item.contact_person} {item.phone_number}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="row mt-5 pt-3">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="name" className="mb-3">
                    Persona de contacto
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill w-100 border-1 py-3 px-3"
                      name="contact_person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="name" className="mb-3">
                      Adresso
                    </label>
                    <input
                      type="tel"
                      className="form-control rounded-pill w-100 border-1 py-3 px-3"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>  
                </div>
              </div>
             

              {/* Order */}
              <div className="container-fluid">
                <div className="header mt-5">
                  <p className="fs-3 fw-bold est">Order details</p>
                </div>
                <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                <select onChange={handleOrderSelect} className="form-select rounded-pill w-100 border-1 py-3 px-3">
                  <option value="">Select Order</option>
                  {ordersData.map((order, index) => (
                    <option key={index} value={order.order_number}>
                      {order.order_number}
                    </option>
                  ))}
                </select>
              </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                    Cantidad de reserva
                    </label>
                    <input
                      type="text"
                      name="reserved_quantity"
                      value={formData.reserved_quantity}
                      onChange={handleChange}
                      readOnly={true}
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                    Importe devuelto por la cliente
                    </label>
                    <input placeholder="&#8364; "
                      type="text"
                      name="amount_returned_by_customer"
                      value={formData.amount_returned_by_customer}
                      onChange={handleChange}
                      readOnly={true}

                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                    Cantidad vendida
                    </label>
                    <input
                      type="text"
                      name="quantity_sold"
                      value={formData.quantity_sold}
                      onChange={handleChange}
                      readOnly={true}
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                    Cantidad cargada
                    </label>
                    <input placeholder="&#8364; "
                      type="text"
                      name="amount_charged"
                      value={formData.amount_charged}
                      onChange={handleChange}
                      readOnly={true}
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                      Regalo
                    </label>
                    <input
                      type="text"
                      name="gift_or_discount"
                      value={formData.gift_or_discount}
                      onChange={handleChange}
                      readOnly={true}
                      placeholder="&#8364; "
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="my-3">
                <h3 className="fw-bold">Factura</h3>
              </div>
              <div className=" w-100">
                
              <ResponsiveExample selectedOrderId={selectedOrderId} /> {/* Pass selected order ID as a prop */}
                {/* <div className="mt-3 fw-bold">
                  <i class="bi bi-plus-lg est"></i>
                  <a href="/" className="est">
                    Add more
                  </a>
                </div> */}
                <div className="text-center mt-3">
                  
                  {/* <Successmodal2/> */}
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default Lotery;