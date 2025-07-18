import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useLocation} from 'react-router-dom';
import "./Managerpage.css";
import ManagerpageTable from '../Tables/ManagerpageTable';
import config from '../../config';

const API_BASE_URL = `${config.API_BASE_URL}`;

const Managerpage = () => {

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/establishment/${establishmentId}`);

        if (response.status === 200) {
          setResponseData(response.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE_URL]);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const establishmentId = queryParams.get('establishmentId');



  return (
    <div>
      <div className="container-fluid">
        <div className="manager-page">
          <div className="pt-3 ps-5">
            <Link className="text-light text-decoration-none fs-5 ml-4" to="/Rider-login">
              <i className="bi bi-chevron-left"></i> Regresa
            </Link>
            {/* {console.log(establishmentId)} */}
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-8 col-md-6 col-sm-12 p-5">
              <h1 className="text-light text-center fw-bold">
                {responseData.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="my-5 w-75">
            <input
              type="search"
              className="form-control rounded-pill py-4"
              placeholder="Buscar ordenes...."
            />
          </div>
          <div className="row justify-content-between mb-3 gy-3 w-75">
            <div className="fs-5 icon col-lg-6 col-md-6 col-sm-12">
              <Link to={`/add-order?establishmentId=${establishmentId}`} className="icon text-decoration-none">
                {" "}
                <i class="bi bi-plus-lg"></i>Agregar nuevo pedido 
              </Link>
            </div>
            <div className="fs-5 col-lg-6 col-md-6 col-sm-12 text-start text-lg-end">
              <Link  to={`/edit-company-detail?establishmentId=${establishmentId}`} className="icon text-decoration-none ">
                <i class="bi bi-plus-lg fw-bolder fs-4"></i>Editar detalles de la empresa
              </Link>
            </div>
          </div>
          {/* Table */}
          <div className="px-5">
            {/* <table className="table table-bordered table-responsive align-middle w-100">
              
 
            </table>  */}
            <ManagerpageTable establishmentId = {Number(establishmentId)}/>
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
              <a href="/">loteriaelmolar@yahoo.es12345678</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managerpage;
