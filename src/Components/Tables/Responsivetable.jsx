import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsCaretDownFill } from "react-icons/bs";

function Responsivetable({ selectedOrderId }) {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;

  const columnTypes = [
    "Date",
    "Series",
    "Quantity delivered",
    "Amount paid",
    "Balance",
    "Discount",
    "Confirmation",
  ];

  const [cellValues, setCellValues] = useState([]);
  const [confirmationStatus, setConfirmationStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalRowIndex, setModalRowIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (rowIndex) => {
    setModalRowIndex(rowIndex);
    setShowModal(true);
  };

  const handleInputChange = async (rowIndex, colIndex, value) => {
    try {
      const newCellValues = [...cellValues];
  
      // Ensure the row exists before updating its value
      if (!newCellValues[rowIndex]) {
        newCellValues[rowIndex] = createEmptyRow(); // Create a new empty row if it doesn't exist
      }
  
      newCellValues[rowIndex].value[colIndex] = value;
  
      setCellValues(newCellValues);
    } catch (error) {
      console.error("Could not update data:", error);
    }
  };

  const handleConfirmationClick = (rowIndex, status) => {
    try {
      if (status !== 'Approved' && status !== 'Pending') {
        throw new Error('Invalid confirmation status');
      }
  
      const newStatus = [...confirmationStatus];
      newStatus[rowIndex] = status;
      setConfirmationStatus(newStatus);

  
      const newCellValues = [...cellValues];
  
      if (!newCellValues[rowIndex]) {
        newCellValues[rowIndex] = createEmptyRow(); // Create a new empty row if it doesn't exist
      }
  
      newCellValues[rowIndex][6] = { value: status }; // Ensure that the structure exists before setting 'value'
  
      setCellValues(newCellValues);
    } catch (error) {
      console.error('Error updating confirmation status:', error);
    }
  };
  
  const handleModalAction = (action) => {
    if (modalRowIndex !== null) {
      try {
        if (action !== 'Approved' && action !== 'Pending') {
          throw new Error('Invalid confirmation status');
        }
  
        handleConfirmationClick(modalRowIndex, action);
        handleCloseModal();
      } catch (error) {
        console.error('Error handling modal action:', error);
      }
    }
  };

  // const handleSave = async () => {
  //   try {
  //     // Retrieve the confirmed value from the confirmationStatus state based on the modalRowIndex
  //     const confirmedValue = confirmationStatus[modalRowIndex];
  
  //     // Check if the confirmed value is neither 'Approved' nor 'Pending'
  //     if (confirmedValue !== 'Approved' && confirmedValue !== 'Pending') {
  //       throw new Error('Invalid confirmed value');
  //     }
  
  //     // Format the row according to the server's expected data format
  //     const formattedRow = {
  //       order: selectedOrderId,
  //       series: cellValues[modalRowIndex].value[1],
  //       quantity_delivered: parseInt(cellValues[modalRowIndex].value[2]),
  //       amount_paid: parseInt(cellValues[modalRowIndex].value[3]),
  //       balance: parseInt(cellValues[modalRowIndex].value[4]),
  //       discount: parseInt(cellValues[modalRowIndex].value[5]),
  //       confirmed: confirmedValue,
  //     };
  
  //     // Construct data to be sent in the POST request
  //     const data = formattedRow;
  
  //     const response = await fetch(`${apiHostname}/invoice/create/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to save data to the backend");
  //     } else {
  //       console.log("Data saved successfully:", data);
  //       window.location.reload();
  //       // Additional logic or UI updates upon successful save
  //     }
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiHostname}/invoice/invoices-by-order/${selectedOrderId}/`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch data from the endpoint");
        }
  
        const data = await response.json();
        console.log("Received Data:", data);
  
        if (Array.isArray(data) && data.length > 0) {
          const formattedCellValues = data.map((item) => {
            // Format the 'created' date field to 'yyyy-MM-dd' format
            const formattedDate = new Date(item.created).toISOString().substring(0, 10);
  
             return {
              value: [
                formattedDate,
                item.series,
                item.quantity_delivered,
                item.amount_paid,
                item.balance,
                item.discount,
                item.confirmed,
              ],
              type: "text",
            };
          });
  
          setCellValues(formattedCellValues);
          // Set the confirmationStatus state based on mapped values
          const mappedConfirmationStatus = formattedCellValues.map((row) => row.value[6]);
          setConfirmationStatus(mappedConfirmationStatus);
        } else {
          throw new Error("Invalid data format received from the API");
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [selectedOrderId, apiHostname]);
  
  
  

  const createEmptyRow = () => {
    return {
      value: ["", "", "", "", "", "", ""], // Default values for each column
      type: "text",
    };
  };
  // Ensure there's always an empty row for user input at the end
  useEffect(() => {
    if (cellValues.length === 0 || cellValues[cellValues.length - 1].value.some(value => value !== "")) {
      setCellValues((prevCellValues) => [...prevCellValues, createEmptyRow()]);
    }
  }, [cellValues]);

  return (
    <>
      <Table responsive>
        <thead>
          <tr className="text-center">
            {columnTypes.map((type, index) => (
              <th key={index}>{type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cellValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.value.map((cell, colIndex) => (
                <td key={colIndex}>
                  {colIndex === 6 && (
                    <>
                      {confirmationStatus[rowIndex] !== "Approved" &&
                      confirmationStatus[rowIndex] !== "Pending" ? (
                        <Button
                          onClick={() => handleShowModal(rowIndex)}
                          variant="link"
                          style={{ padding: 0 }}
                          className="text-decoration-none bg-transparent"
                        >
                          {cell} Pending <BsCaretDownFill />
                        </Button>
                      ) : (
                        cell
                      )}
                    </>
                  )}
                  {colIndex !== 6 && (
                    <input
                      type={columnTypes[colIndex]}
                      value={cell} // Use cell directly from cellValues state
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly onFocus={(e) => e.target.blur()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        {/* <button
          className="btn-link text-decoration-none border-0 text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5"
          onClick={handleSave}
        >
          Save From ResponsiveTable
        </button> */}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalRowIndex !== null && (
            <>
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => handleModalAction("Approved")}
              >
                Approved
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleModalAction("Pending")}
              >
                Pending
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Responsivetable;
