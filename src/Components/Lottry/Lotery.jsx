import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lotery.css";
import ResponsiveExample from "../Tables/Responsivetable";
import Successmodal2 from "../Successmodal2/Successmodal2";

const Lotery = () => {
  const [responseData, setResponseData] = useState([]);

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
        const response = await axios.get("http://127.0.0.1:9090/establishment/");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    const selectedData = responseData[selectedIndex - 1];
    setFormData((prevData) => ({
      ...prevData,
      name: selectedData ? selectedData.name : "",
      contact_person: selectedData ? selectedData.contact_person : "",
      phone_number: selectedData ? selectedData.phone_number : "",
      order_number: selectedData ? selectedData.order_number : "",
      reserved_quantity: selectedData ? selectedData.reserved_quantity : "",
      quantity_sold: selectedData ? selectedData.quantity_sold : "",
      amount_charged: selectedData ? selectedData.amount_charged : "",
      gift_or_discount: selectedData ? selectedData.gift_or_discount : "",
      amount_returned_by_customer: selectedData ? selectedData.amount_returned_by_customer : "",
    }));
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
                      Contact Person
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
                    <label htmlFor="name" className="fs-5 mb-2">
                      Number
                    </label>
                    <input
                     type="text"
                     className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                     name="order_number"
                     value={formData.order_number}
                     onChange={handleChange}
                     readOnly={true}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                      Reserve Quantity
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
                      Amount returned by customer
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
                      Quantity sold
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
                      Amount charged
                    </label>
                    <input placeholder="&#8364; "
                      type="text"
                      name="amount_charged"
                      value={formData.amount_charged}
                      onChange={handleChange}
                      readOnly={false}
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                    <label htmlFor="name" className="fs-5 mb-2">
                      Gift/Discount
                    </label>
                    <input
                      type="text"
                      name="gift_or_discount"
                      value={formData.gift_or_discount}
                      onChange={handleChange}
                      readOnly={false}
                      placeholder="&#8364; "
                      className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                    />
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="my-3">
                <h3 className="fw-bold">Invoice</h3>
              </div>
              <div className=" w-100">
                {/* <table className="table-1 table-bordered table-responsive align-middle w-100">
                  <thead>
                    <tr>
                      <th scope="col" className="p-4">
                        Date
                      </th>
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
                      <Link to="/pending">Pending <i class="bi bi-chevron-down"></i></Link>
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="p-4 text-center">3356</td>
                      <td className="p-4 text-center">24-46</td>
                      <td className="p-4 text-center">$200</td>
                      <td className="p-4 text-center">$200</td>
                      <td className="p-4 text-center">$500</td>
                      <td className="p-4 text-center">$200</td>
                    </tr>
                    <tr className="text-center">
                      <td className="p-4">3356</td>
                      <td className="p-4">24-46</td>
                      <td className="p-4">$200</td>
                      <td className="p-4">$200</td>
                      <td className="p-4">$500</td>
                      <td className="p-4">$200</td>
                    </tr>
                    <tr>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                    </tr>
                    <tr>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                    </tr>
                  </tbody>
                </table> */}
                <ResponsiveExample/>
                <div className="mt-3 fw-bold">
                  <i class="bi bi-plus-lg est"></i>
                  <a href="/" className="est">
                    Add more
                  </a>
                </div>
                <div className="text-center mt-3">
                  {/* <button
                    type="submit"
                    className="save rounded-pill text-light w-50 py-3 mt-5 mb-5"
                  >
                    Entregar
                  </button> */}
                  <Successmodal2/>
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
