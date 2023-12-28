import React from "react";
import "./Lottery.css";
import ResponsiveExample from "../Tables/ResponsiveExample";
import Addanothermodal from "../Addanothermodal/Addanothermodal";


const Lottery = () => {

  return (
    <div className="container-fluid">
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
              <p className="text-center mt-3">
                Please fill in the details below
              </p>
            </div>
          </div>
        </div>

        <div className="row rounded-5 w-100 mt-3">
          <div className="header mt-5">
            <p className="fs-3 fw-bold">Establishment</p>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="mb-4">
              <label htmlFor="name" className="mb-3">
                Name of Establishment
              </label>
              <select
                    className="form-select rounded-pill w-100 border-1 py-3 px-3"
                    aria-label="Default select example"
                  >
                    <option selected>select establishment</option>
                    <option value="select establisment">select establishment</option>
                    <option value="select establisment">select establishment</option>
                    <option value="select establisment">select establishment</option>
                  </select>
            </div>
            <div>
              <div className="row mt-5 pt-3">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <label htmlFor="name" className="mb-3">
                  Contact Person
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-pill w-100 border-1 py-3 px-3"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <label htmlFor="name" className="mb-3">
                  Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-pill w-100 border-1 py-3 px-3"
                  />
                </div>
              </div>
            </div>

            {/* riders details */}
            <div className="row justify-content-center">
              <div className="">
                <div className="header mt-5">
                  <p className="fs-3 fw-bold mt-4">Riders Details</p>
                </div>
                <div className="mb-4 mt-5">
                  <label htmlFor="name" className="mb-3">
                    Name
                  </label>

                  <select
                    className="form-select rounded-pill w-100 border-1 py-3 px-3"
                    aria-label="Default select example"
                  >
                    <option selected>Select rider</option>
                    <option value="1">Select rider</option>
                    <option value="2">Select rider</option>
                    <option value="3">Select rider</option>
                  </select>
                </div>
                <div>
                  <div className="row mt-5 pt-3">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <label htmlFor="contact" className="mb-3">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        className="form-control rounded-pill w-100 border-1 py-3 px-3"
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="phone number" className="mb-3">
                        Address
                      </label>
                      <input
                        type="address"
                        className="form-control rounded-pill w-100 border-1 py-3 px-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order */}
            <div className="container-fluid">
              <div className="header mt-5">
                <p className="fs-3 fw-bold">Order details</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                  <label htmlFor="number" className="fs-5 mb-2">
                    Number
                  </label>
                  <input
                    type="number"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                  <label htmlFor="Reserve Quantity" className="fs-5 mb-2">
                    Reserve Quantity
                  </label>
                  <input
                    type="number"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                  <label htmlFor="amount returned" className="fs-5 mb-2">
                    Amount returned by customer
                  </label>
                  <input placeholder="&#8364;"
                    type="number"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="name" className="fs-5 mb-2">
                    Quantity sold
                  </label>
                  <input
                    type="number"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="amount charged" className="fs-5 mb-2">
                    Amount charged
                  </label>
                  <input
                  placeholder="&#8364; "
                    type="number"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
                  <label htmlFor="name" className="fs-5 mb-2">
                    Gift/Discount
                  </label>
                  <input
                  placeholder="&#8364; "
                    type="text"
                    className="rounded-pill w-100 border-1 py-3 px-3 form-control"
                  />
                </div>
                <h2 className="">Invioce</h2>
                <div className="px-5">

                  {/* <table className="table table-bordered table-responsive align-middle w-100">
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
                    <Link to="/pending">
                      Pending <i class="bi bi-chevron-down"></i>
                    </Link>
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
                  {/* <div className="row">
                    <div className="col-lg-12 ">
                      <table className="table text-center">
                        <tr className="text-center">
                          <th>Date</th>
                          <th>Series</th>
                          <th>Quantity Delivered</th>
                          <th>Amount paid</th>
                          <th>Balance</th>
                          <th>Discount</th>
                          <th>Confirmation</th>
                        </tr>

                        {tableData.map((row) => (
                          <tr key={row.id}>
                            <td>{row.id}</td> 
                            <td>
                              <input
                                className=" class"
                                type="date"
                                value={row.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "date",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="class">
                              <input
                                type="number"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "series",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                className="class"
                                type="Number"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "quantityDelivered",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                className="class"
                                type="Number"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "amountPaid",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                className="class"
                                type="number"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "balance",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                className="class"
                                type="number"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "discount",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                className="class"
                                type="button"
                                value={row.value}
                                onChange={(e) =>
                                  handleInputChange(
                                    row.id,
                                    "pending",
                                    e.target.value
                                  )
                                }
                              />
                              <span className="btn">
                                 <i className=" bi bi-chevron-down"></i>
                              </span>
                               
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div> */}
                  <ResponsiveExample/>
                </div>
              </div>
              <div className="text-center mt-3">
                {/* <Link
                  to="/confirm"
                  type="submit"
                  className="save text-decoration-none rounded-pill text-light  w-75   py-3 mt-5 mb-5"
                >
                  Save
                </Link> */}
                <Addanothermodal/>
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
  );
};

export default Lottery;
