import { Modal } from 'react-bootstrap';
import React, { useState } from "react";
import './Copyriderlink.css'
import { Link } from 'react-router-dom';


function Copyriderlink({showModal, handleCloseModal, riderId, first_name, last_name, phone}) {

  const apiHostname2 = process.env.REACT_APP_API_HOSTNAME2;
  const [copyFlashMessage, setCopyFlashMessage] = useState({ text: '', color: '' });


  const handleCopyLink = () => {
    const riderData = {first_name: first_name, last_name: last_name, phone: phone };
    const queryParams = new URLSearchParams(riderData).toString();
    const riderPageLink = `${apiHostname2}/Login?${queryParams}`;
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


  return (
    <>
      

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-transparent rounded-3">
      {/* <Modal.Header closeButton>
        
        </Modal.Header> */}
        <Modal.Body dialogClassName="modal-body">
        <div className="header text-center">
                    <i class="bi bi-check-circle-fill icon"></i>
                </div>
                <div className='text-center pb-5 fw-bold text-dark'>
                    <h1>Weldone!!!</h1>
                    <p>
                        Saved successfully
                    </p>
                    <div className='mt-5 mb-5'>
                        <div>
                        <Link to="/rider-page-2" className='rounded-pill go-back py-2 px-5 text-decoration-none d-block  w-100 btn-link mt-3 text-light'>Go back</Link>
                        </div>
                        <div>
                        {/* <Link to="/" className='rounded-pill py-2 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>Copy rider link</Link>
                        */}
                      <div className="copy my-4">
                        <button onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">Copy rider link</button>
                        {copyFlashMessage.text && (
                          <div className="flash-message" style={{ color: copyFlashMessage.color }}>
                            {copyFlashMessage.text}
                          </div>
                        )}
                      </div>
          
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

export default Copyriderlink;