import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';

function Examplem({ riderId, first_name, last_name, phone }) {
  const apiHostname = process.env.REACT_APP_API_HOSTNAME;
  const [showModal, setShowModal] = useState(false);
  const [copyFlashMessage, setCopyFlashMessage] = useState({ text: '', color: '' });
  const [deleteFlashMessage, setDeleteFlashMessage] = useState({ text: '', color: '' });

  const handleCopyLink = () => {
    const riderData = { id: riderId, first_name: first_name, last_name: last_name, phone: phone };
    const queryParams = new URLSearchParams(riderData).toString();
    const riderPageLink = `https://dispatch-app-react-v1-ekehanson.vercel.app/Login?${queryParams}`;
    navigator.clipboard.writeText(riderPageLink)
      .then(() => {
        setCopyFlashMessage({ text: 'Link Successfully Copied', color: 'blue' });
        setTimeout(() => {
          setCopyFlashMessage({ text: '', color: '' });
        }, 3000);
        console.log('Link copied to clipboard:', riderPageLink);
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
      });
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleDeleteRider = async () => {
    console.log("About to delete rider");
    if (riderId) {
      try {
        const response = await axios.delete(`${apiHostname}/rider/${riderId}`);
        if (response.status === 204) {
          setDeleteFlashMessage({ text: 'Rider Deleted Successfully', color: 'red' });
          setTimeout(() => {
            setDeleteFlashMessage({ text: '', color: '' });
          }, 5000); // Modify the duration (e.g., 5000 milliseconds = 5 seconds)
          console.log('Rider deleted successfully');
        } else {
          console.error('Failed to delete rider');
        }
        handleModalToggle();
      } catch (error) {
        console.error('Error deleting rider:', error);
      }
    }
  };

  return (
    <>
      <BsThreeDotsVertical
        onClick={handleModalToggle}
        className="position-absolute top-0 end-0 me-4 mt-3 bi bi-three-dots-vertical text-light btn-modal"
      />

      <Modal show={showModal} onHide={handleModalToggle} size="md" centered>
        <Modal.Body className="text-center shadow-lg rounded-5">
          <Card>
            <div className="copy my-4">
              <button onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">Copy rider link</button>
              {copyFlashMessage.text && (
                <div className="flash-message" style={{ color: copyFlashMessage.color }}>
                  {copyFlashMessage.text}
                </div>
              )}
            </div>
            <div className="my-4">
              <button onClick={handleDeleteRider} className="delete-btn rounded-pill px-5 py-2 fw-bold">
                Delete rider
              </button>
              {deleteFlashMessage.text && (
                <div className="flash-message" style={{ color: deleteFlashMessage.color }}>
                  {deleteFlashMessage.text}
                </div>
              )}
            </div>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Examplem;
