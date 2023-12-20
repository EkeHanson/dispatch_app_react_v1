// MyModalComponent.js

import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import './Managerlinkmodal.css'
import { Link } from 'react-router-dom';


function Managerlinkmodal({  onSaveClick , establishmentId}) {
  const apiHostname2 = process.env.REACT_APP_API_HOSTNAME2;
  const [copyFlashMessage, setCopyFlashMessage] = useState({ text: '', color: '' }); 
  const [showModal, setShowModal] = useState(false);

  const handleCopyLink = () => {
    const riderData = { establishmentId: establishmentId};
    const queryParams = new URLSearchParams(riderData).toString();
    // const riderPageLink = `https://dispatch-app-react-v1-ekehanson.vercel.app/log-manager?${queryParams}`;
    const riderPageLink = `${apiHostname2}/log-manager?${queryParams}`;
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

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    onSaveClick(); // Call the onSaveClick function passed from the parent
    handleCopyLink()
    handleCloseModal(); // Close the modal after calling the onSaveClick function
  };

  
  console.log("establishmentId")
  console.log(establishmentId)
  return (
    <>
      <Button variant="primary" className='btn-link text-decoration-none text-light fw-bold rounded-pill w-50 py-3 mt-5 mb-5' onClick={handleSaveClick}>
        Save
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-transparent rounded-3">
      {/* <Modal.Header closeButton>
        
        </Modal.Header> */}
        <Modal.Body dialogClassName="modal-body">
        <div className={`modal ${showModal ? 'visible' : 'hidden'}header text-center`}>
                    <i class="bi bi-check-circle-fill icon"></i>
                </div>
                <div className='text-center pb-5 fw-bold text-dark'>
                    <h1>Weldone!!!</h1>
                    <p>
                        Saved successfully
                    </p>
                    <div className='mt-5 mb-5'>
                        <div>
                        <Link   to="/rider-page"  onClick={handleSave} className='rounded-pill go-back py-3 px-5 text-decoration-none d-block  w-100 btn-link mt-3 text-light'>Go back</Link>
                        </div>
                        <div>
                        <Link to="/rider-page" onClick={handleSave} className='rounded-pill py-3 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>Copy manager link</Link>
                        {copyFlashMessage.text && (
                          <div className="flash-message" style={{ color: copyFlashMessage.color }}>
                            {copyFlashMessage.text}
                          </div>
                        )}
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

export default Managerlinkmodal;
