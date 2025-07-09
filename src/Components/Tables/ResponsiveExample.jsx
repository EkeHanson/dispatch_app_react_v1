import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsCaretDownFill } from "react-icons/bs";

import config from '../../config';

const API_BASE_URL = `${config.API_BASE_URL}`;

function ResponsiveExample({ selectedOrderId }) {

  const columnTypes = [
    "Date",
    "Serie",
    "Cantidad entregada",
    "Cantidad pagada",
    "diferencial",
    "Descuento",
    "Confirmación",
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
  
      if (!newCellValues[rowIndex]) {
        newCellValues[rowIndex] = createEmptyRow();
      }
  
      newCellValues[rowIndex].value[colIndex] = value;
  
      // Update confirmation status specifically when the column index is 6 (Confirmation column)
      if (colIndex === 6) {
        const newConfirmationStatus = [...confirmationStatus];
        newConfirmationStatus[rowIndex] = value;
        setConfirmationStatus(newConfirmationStatus);
      }
  
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
        newCellValues[rowIndex] = createEmptyRow();
      }

      newCellValues[rowIndex][6] = { value: status };

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

  const handleSave = async () => {
    try {
      const confirmedValue = confirmationStatus[modalRowIndex];

      if (confirmedValue !== 'Approved' && confirmedValue !== 'Pending') {
        throw new Error('Invalid confirmed value');
      }

      const formattedRow = {
        order: selectedOrderId,
        series: cellValues[modalRowIndex].value[1],
        quantity_delivered: parseInt(cellValues[modalRowIndex].value[2]),
        amount_paid: parseInt(cellValues[modalRowIndex].value[3]),
        balance: parseInt(cellValues[modalRowIndex].value[4]),
        discount: parseInt(cellValues[modalRowIndex].value[5]),
        confirmed: confirmedValue,
      };

      const data = formattedRow;

      const response = await fetch(`${API_BASE_URL}/invoice/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to the backend");
      } else {
        alert("Data saved successfully:", data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/invoice/invoices-by-order/${selectedOrderId}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from the endpoint");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const formattedCellValues = data.map((item) => {
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
  }, [selectedOrderId, API_BASE_URL]);

  const createEmptyRow = () => {
    return {
      value: ["", "", "", "", "", "", ""],
      type: "text",
    };
  };

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
    <input
      type="text"
      value={cell}
      onChange={(e) =>
        handleInputChange(rowIndex, colIndex, e.target.value)
      }
      onClick={(e) => e.stopPropagation()}
    />
    {confirmationStatus[rowIndex] !== "Approved" &&
      confirmationStatus[rowIndex] !== "Pending" && (
        <Button
          onClick={() => handleShowModal(rowIndex)}
          variant="link"
          style={{ padding: 0 }}
          className="text-decoration-none bg-transparent"
        >
          Pending <BsCaretDownFill />
        </Button>
      )}
  </>
)}

                  {colIndex !== 6 && (
                    <input
                      type={columnTypes[colIndex]}
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      readOnly={
                        confirmationStatus[rowIndex] === "Approved" ||
                        confirmationStatus[rowIndex] === "Pending"
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <button
          className="btn-link text-decoration-none border-0 text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5"
          onClick={handleSave}
        >
          Ahorrar
        </button>
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

export default ResponsiveExample;
