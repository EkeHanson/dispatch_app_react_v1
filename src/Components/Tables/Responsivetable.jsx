import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ResponsiveExample({ establishmentId }) {
  const columnTypes = [
    "Date",
    "Series",
    "Quantity Delivered",
    "Amount Paid",
    "Balance",
    "Discount",
    "Confirm",
  ];

  const [cellValues, setCellValues] = useState([]);

  const [confirmationStatus, setConfirmationStatus] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalRowIndex, setModalRowIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (action, rowIndex) => {
    setModalAction(action);
    setModalRowIndex(rowIndex);
    setShowModal(true);
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newCellValues = [...cellValues];
    newCellValues[rowIndex][colIndex].value = value;
    setCellValues(newCellValues);
  };

  const handleConfirmationClick = (rowIndex, status) => {
    const newStatus = [...confirmationStatus];
    newStatus[rowIndex] = status;
    setConfirmationStatus(newStatus);

    handleCloseModal();
  };

  const handleModalAction = () => {
    if (modalAction === "Approve") {
      handleConfirmationClick(modalRowIndex, "Approved");
    } else if (modalAction === "Pending") {
      handleConfirmationClick(modalRowIndex, "Pending");
    }

    handleCloseModal();
  };

  useEffect(() => {
    const loadDataFromBackend = async () => {
      try {
        const url = `https://distachapp.onrender.com/order/by_establishment/${establishmentId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the backend");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const updatedCellValues = data.map((order) => {
            const formattedDate = new Date(order.created).toISOString().split('T')[0];
            return {

            value: [
              { value: formattedDate, type: "Date" },
              { value: order.series || "", type: "text" },
              { value: order.quantity_delivered || "", type: "number" },
              { value: order.amount_paid || "", type: "number" },
              { value: order.balance || "", type: "number" },
              { value: order.discount || "", type: "number" },
              { value: order.confirmed ? "Approved" : "Pending", type: "text" },
            ],
          };
          });
          setCellValues(updatedCellValues);
          setConfirmationStatus(Array(data.length).fill("pending"));
        }
      } catch (error) {
        console.error("Error loading data from the backend:", error);
      }
    };

    loadDataFromBackend();
  }, [establishmentId]);

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
                      {confirmationStatus[rowIndex] === "Pending" && (
                        <Button onClick={() => handleShowModal("Approve", rowIndex)}>
                          Approve
                        </Button>
                      )}
                      {confirmationStatus[rowIndex] === "Approved" && (
                        <Button onClick={() => handleShowModal("Pending", rowIndex)}>
                          Pending
                        </Button>
                      )}
                      {confirmationStatus[rowIndex] !== "Approved" &&
                        confirmationStatus[rowIndex] !== "Pending" && (
                          <>
                            <Button onClick={() => handleShowModal("Pending", rowIndex)}>
                              Pending
                            </Button>
                            <Button onClick={() => handleShowModal("Approve", rowIndex)}>
                              Approve
                            </Button>
                          </>
                        )}
                    </>
                  )}
                  {colIndex !== 6 && (
                    <input
                      type={row.value[colIndex].type}
                      value={cell.value}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to ${modalAction.toLowerCase()} this item?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalAction}>
            {modalAction}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResponsiveExample;
