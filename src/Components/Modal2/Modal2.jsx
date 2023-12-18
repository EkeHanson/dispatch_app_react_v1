import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
// import './Modal.css';

function Examplem({riderId, first_name, last_name, phone}) {
  
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [showModal, setShowModal] = useState(false);
  // const [riderId, setRiderId] = useState(null); // State to store the rider ID


  const handleCopyLink = () => {
    
    const riderData = { id: riderId, first_name: first_name, last_name: last_name, phone: phone }; // Example data to include in the link
    const queryParams = new URLSearchParams(riderData).toString();
    const riderPageLink = `https://dispatch-app-react-v1-ekehanson.vercel.app/Login?${queryParams}`;
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


  const handleModalToggle = (id = null) => {
    setShowModal(!showModal);
  //   setRiderId(id); // Set the rider ID when the modal is toggled
  };
  const handleDeleteRider = async () => {
    console.log("About to delete rider");
    if (riderId) {
      try {
        
        const response = await axios.delete(`${apiHostname}/rider/${riderId}`);
        if (response.status === 204) {
          // Handle successful deletion
          console.log('Rider deleted successfully');
          // You may want to update UI or take other actions upon successful deletion
        } else {
          // Handle deletion failure
          console.error('Failed to delete rider');
          // Notify user about deletion failure
        }
        // Close the modal regardless of the deletion result
        handleModalToggle();
      } catch (error) {
        console.error('Error deleting rider:', error);
        // Notify user about deletion failure due to an error
      }
    }
  };

  return (
    <>
      <BsThreeDotsVertical
        onClick={() => handleModalToggle()} // Open modal without passing ID (for copy)
        className="position-absolute top-0 end-0 me-4 mt-3 bi bi-three-dots-vertical text-light btn-modal"
      />

      <Modal show={showModal} onHide={handleModalToggle} size="md" centered>
        <Modal.Body id="heloworld" className="text-center shadow-lg rounded-5">
          <Card>
            <div className="copy my-4">
              <button onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">Copy rider link</button>
            </div>
            <div className="my-4">
              <button onClick={handleDeleteRider} className="delete-btn rounded-pill px-5 py-2 fw-bold">
                Delete rider 
              </button>
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Examplem;

