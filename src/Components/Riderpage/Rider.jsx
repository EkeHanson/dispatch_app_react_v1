import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import "./Rider.css";
import Establish from "../Establishment/Establish";
import Ridercompo from "../Ridercomponent/Ridercompo";
import axios from "axios";

const Rider = ({ onpageSwitch }) => {
  const [activeState, setActiveState] = useState("establishment");
  // eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState("");
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOSTNAME}/establishment`);
        setEstablishments(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredEstablishments = establishments.filter((establishment) =>
    establishment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid w-100">
      <div className="establish">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-6 col-sm-12 p-5">
            <p className="fs-3 text-light">Buenas noches,</p>
            <h1 className="text-light text-center fw-bold">ADMIN DE LOTERIA</h1>
          </div>
        </div>
        <div className="pt-3 ps-5">
          <Link to="/" className="text-light text-decoration-none fs-5 ml-4">
            <i className="bi bi-chevron-left"></i> Go Back
          </Link>
        </div>
      </div>
    
      <div className="row justify-content-center align-item-center">
        <div className="row justify-content-center">
          <div className="card rounded-0 border-0">
            <div className="card-body w-100">
              <div className="d-none d-lg-block">
                <div className=" bg-secondary rounded-pill row col-lg-6 p-2 m-auto justify-content-between align-items-center">
                  <div
                    className={`${
                      activeState === "establishment" ? "bg-white" : ""
                    } p-5  py-2 cursor-pointer rounded-pill text-center col-lg-6 col-md-6 col-sm-6`}
                    onClick={() => setActiveState("establishment")}
                  >
                    Establecimiento
                  </div>

                  <div
                    className={`${
                      activeState === "rider" ? "bg-white" : ""
                    } px-5 py-2 cursor-pointer rounded-pill text-center col-lg-6 col-md-6 col-sm-6`}
                    onClick={() => setActiveState("rider")}
                  >
                    Riders
                  </div>
                </div>
                {/* <input
                  type="search"
                  className="form-control rounded-pill mt-5 py-3"
                  placeholder="Buscar establecimiento...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                {activeState === "establishment" && <Establish filteredEstablishments={filteredEstablishments} />}
                {activeState === "rider" && (
                  <div>
                    {" "}
                    <Ridercompo />{" "}
                  </div>
                )}
              </div>
              <div className="d-md-block d-lg-none">
                <div
                  className=" bg-transparent rounded-pill row col-lg-6 col-md-12 col-sm-12 p-2 mx-auto justify-content-center align-items-center"
                >
                   <div
                    className={`${
                      activeState === "establishment" ? "bg-secondary " : ""
                    } px-5 py-2 cursor-pointer rounded-pill text-center col-lg-6 col-md-6 col-sm-6`}
                    onClick={() => setActiveState("establishment")}
                  >
                    Establecimiento
                  </div>

                  <div
                    className={`${
                      activeState === "rider" ? "bg-secondary " : ""
                    } px-5 py-2 cursor-pointer rounded-pill text-center col-lg-6 col-md-6 col-sm-6`}
                    onClick={() => setActiveState("rider")}
                  >
                    Rider
                  </div>
                </div>
                {/* <input
                  type="search"
                  className="form-control rounded-pill mt-5 py-3"
                  placeholder="Buscar establecimiento...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                {activeState === "establishment" && <Establish filteredEstablishments={filteredEstablishments} />}
                {activeState === "rider" && (
                  <div>
                    {" "}
                    <Ridercompo />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid footer py-4 bg-light text-center mt-5 mb-0">
        <div className="row justify-content-center ">
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

export default Rider;
