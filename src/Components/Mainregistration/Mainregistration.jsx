// Main component where you switch between Owner and Admin
import React, { useState } from "react";
import Adminregister from "../Register/Adminregister"; // Import the updated Adminregister component
import Ownerregister from "../Ownerregister/Ownerregister"; // Import the updated Ownerregister component

const Mainregistration = () => {
  const [activeState, setActiveState] = useState("adminRegister");

  const handleFormSwitch = () => {
    setActiveState((prevActiveState) =>
      prevActiveState === "adminRegister" ? "ownerRegister" : "adminRegister"
    );
  };

  return (
    <div>
      {activeState === "adminRegister" && (
        <Adminregister onFormSwitch={handleFormSwitch} />
      )}
      {activeState === "ownerRegister" && (
        <Ownerregister onFormSwitch={handleFormSwitch} />
      )}
    </div>
  );
};

export default Mainregistration;