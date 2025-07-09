import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import './Modal.css';


import config from '../../config';



function Example({ establishmentId, managerName, managerPhone }) {
  const API_BASE_URL = `${config.API_BASE_URL}`;
  const WEB_PAGE__URL = `${config.WEB_PAGE__URL}`;

  const [showModal, setShowModal] = useState(false);
  const [copyFlashMessage, setCopyFlashMessage] = useState({ text: '', color: '' });
  const [deleteFlashMessage, setDeleteFlashMessage] = useState({ text: '', color: '' });

  const handleCopyLink = () => {
    const riderData = { establishmentId: establishmentId, name: managerName, phone: managerPhone };
    const queryParams = new URLSearchParams(riderData).toString();
    // const riderPageLink = `https://dispatch-app-react-v1-ekehanson.vercel.app/log-manager?${queryParams}`;
    const riderPageLink = `${WEB_PAGE__URL}/log-manager?${queryParams}`;
    navigator.clipboard.writeText(riderPageLink)
      .then(() => {
        setCopyFlashMessage({ text: 'Enlace copiado exitosamente', color: 'blue' });
        setTimeout(() => {
          setCopyFlashMessage({ text: '', color: '' });
        }, 3000);
      })
      .catch((error) => {
        alert('Failed to copy link:', error);
      });
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleDeleteEstablishment = async () => {
    if (establishmentId) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/establishment/${establishmentId}`);
        if (response.status === 204) {
          setDeleteFlashMessage({ text: 'Establecimiento eliminado exitosamente', color: 'red' });
          setTimeout(() => {
            setDeleteFlashMessage({ text: '', color: '' });
          }, 5000); // Modify the duration (e.g., 5000 milliseconds = 5 seconds)
        } else {
          alert('Failed to delete establishment');
        }
        
      } catch (error) {
        alert('Error deleting establishment:', error);
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
              <button onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">
              Copiar enlace del administrador
              </button>
              {copyFlashMessage.text && (
                <div className="flash-message" style={{ color: copyFlashMessage.color }}>
                  {copyFlashMessage.text}
                </div>
              )}
            </div>
            <div className="my-4">
              <button onClick={handleDeleteEstablishment} className="delete-btn rounded-pill px-5 py-2 fw-bold">
              Eliminar establecimiento
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

export default Example;
