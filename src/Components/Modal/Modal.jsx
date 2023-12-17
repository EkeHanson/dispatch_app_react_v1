import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import './Modal.css';

function Example({ establishmentId, managerName , managerPhone }) {

  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [showModal, setShowModal] = useState(false);

  const handleCopyLink = () => {
    const riderData = { establishmentId: establishmentId, name : managerName, phone : managerPhone }; // Example data to include in the link
    const queryParams = new URLSearchParams(riderData).toString();
    // const riderPageLink = `${apiHostname}/manager-page?${queryParams}`;
    const riderPageLink = `localhost:3000/log-manager?${queryParams}`;
    navigator.clipboard.writeText(riderPageLink)
      .then(() => {
        console.log('Link copied to clipboard:', riderPageLink);
        // You might want to show a success message or perform additional actions upon successful copy
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
        // Handle the error case if copying fails
      });
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleDeleteEstablishment = async () => {
    console.log('About to delete establishment');
    if (establishmentId) {
      try {
        const response = await axios.delete(`${apiHostname}/establishment/${establishmentId}`);
        if (response.status === 204) {
          console.log('Establishment deleted successfully');
          // Handle deletion success
        } else {
          console.error('Failed to delete establishment');
          // Handle deletion failure
        }
        handleModalToggle(); // Close the modal regardless of the deletion result
      } catch (error) {
        console.error('Error deleting establishment:', error);
        // Handle deletion failure due to an error
      }
    }
  };

  return (
    <>
      <BsThreeDotsVertical
        onClick={handleModalToggle} // No need to pass establishmentId here
        className="position-absolute top-0 end-0 me-4 mt-3 bi bi-three-dots-vertical text-light btn-modal"
      />

      <Modal show={showModal} onHide={handleModalToggle} size="md" centered>
        <Modal.Body id="heloworld" className="text-center shadow-lg rounded-5">
          <Card>
            <div className="copy my-4">
              <button onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">Copy manager link</button>
            </div>
            <div className="my-4">
              <button onClick={handleDeleteEstablishment} className="delete-btn rounded-pill px-5 py-2 fw-bold">
                Delete Establishment
              </button>
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
