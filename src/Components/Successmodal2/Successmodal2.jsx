// MyModalComponent.js

import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import './Successmodal2.css'
import { Link } from 'react-router-dom';


function Successmodal2() {
  const [showModal, setShowModal] = useState(false);

 
  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" className='btn-link text-decoration-none text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5' onClick={handleSaveClick}>
        Save
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-transparent rounded-3">
      {/* <Modal.Header closeButton>
        
        </Modal.Header> */}
        <Modal.Body dialogClassName="modal-body">
        <div className="header text-center">
                    <i class="bi bi-check-circle-fill icon"></i>
                </div>
                <div className='text-center pb-5 fw-bold text-dark'>
                    <h1 className='fw-bold'>Weldone!!!</h1>
                    <p className='fs-4'>
                        Saved successfully
                    </p>
                    <div className='mt-5 mb-3'>
                        <div>
                        <Link to="/edit-company" className='rounded-pill py-3 px-5 text-decoration-none w-100 btn-link mt-3 text-light'>Go Back</Link>
                        </div>
                    </div>
                </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Successmodal2;
