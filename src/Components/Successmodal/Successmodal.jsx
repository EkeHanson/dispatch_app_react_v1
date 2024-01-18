// MyModalComponent.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Successmodal.css';

function Successmodal({ handleSubmit }) {
  const [showModal, setShowModal] = useState(false);

  const handleSaveClick = () => {
    handleSubmit();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoBackClick = () => {
    // Go back to the previous page in the browser history
    window.history.back();
  };

  return (
    <>
      <Button variant="primary" className='btn-link text-decoration-none text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5' onClick={handleSaveClick}>
        Save
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-transparent rounded-3">
        <Modal.Body dialogClassName="modal-body">
          <div className="header text-center">
            <i className="bi bi-check-circle-fill icon"></i>
          </div>
          <div className='text-center pb-5 fw-bold text-dark'>
            <h1 className='fw-bold'>Well done!!!</h1>
            <p className='fs-4'>
              Saved successfully
            </p>
            <div className='mt-5 mb-3'>
              <div>
                {/* Use handleGoBackClick instead of Link */}
                <button onClick={handleGoBackClick} className='rounded-pill py-3 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>Go Back</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Successmodal;
