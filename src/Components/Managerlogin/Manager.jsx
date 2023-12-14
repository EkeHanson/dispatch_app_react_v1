import React from "react";
import "./Manager.css";
import ResponsiveExample from "../Tables/Responsivetable";

const Manager = () => {

  // const [tableData, setTableData] = useState([
  //   { name: "", value: "" },
  //   { name: "", value: "" },
  //   { name: "", value: "" },
  //   { name: "", value: "" },
  //   { name: "", value: "" },
  //   // Add more rows as needed
  // ]);
  // const handleInputChange = (id, field, value) => {
  //   const updatedData = tableData.map((row) =>
  //     row.id === id ? { ...row, [field]: value } : row
  //   );
  //   setTableData(updatedData);
  // };

  return (
    <div>
      <div className="container-fluid ">
        <div className="row manager justify-content-center">
          <div className="col-lg-8 col-md-6 col-sm-12 p-5">
            <p className="fs-3 text-light ml-5 w-50">Buenas noches,</p>
            <h1 className="text-light text-center fw-bold">ADMIN DE LOTERIA</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <form action="/" className="w-75">
            <input
              className="rounded-pill w-100 py-3 px-3 mt-5"
              type="search"
            />
          </form>
          <div>
          <div className="row justify-content-center align-items-center mt-5">

            

            {/* Table */}
            {/* <div className=" w-75">
                   
             
            </table> */}
            <ResponsiveExample/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
