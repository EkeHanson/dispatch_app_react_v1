import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import './Managerlinkmodal.css'
import { Link} from 'react-router-dom';
import config from '../../config';

const API_BASE_URL = `${config.WEB_PAGE__URL}`


function Managerlinkmodal({visible, onClose, establishmentId}) {
    const [copyFlashMessage, setCopyFlashMessage] = useState({ text: '', color: '' }); 

 
 const handleCopyLink = () => {
    const establishmentData = { establishmentId: establishmentId};
    const queryParams = new URLSearchParams(establishmentData).toString();
    const riderPageLink = `${WEB_PAGE__URL}/log-manager?${queryParams}`;
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
  

 
console.log("Updated establishmentId from Managerlinkmodal", establishmentId);

  return (
    <>

      <Modal show={visible} onHide={onClose} dialogClassName="modal-transparent rounded-3">
      {/* <Modal.Header closeButton>
        
        </Modal.Header> */}
        <Modal.Body dialogClassName="modal-body">
        <div className="modal-header">
          <i className="bi bi-check-circle-fill icon mx-auto"></i>
        </div>
        <div className='text-center pb-5 fw-bold text-dark'>
          <h1>Well done!!!</h1>
          <p>Saved successfully</p>
          <div className='mt-5 mb-5'>
            <div>
              <Link to="/rider-page" className='rounded-pill go-back py-3 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>
                Go back
              </Link>
            <div
                onClick={handleCopyLink}
                className="rounded-pill px-5 py-2 copy-btn fw-bold"
                style={{ cursor: "pointer" }}
            >
            Copy manager link
            </div>
            </div>
            <div>

            {/* <Link onClick={handleCopyLink} className="rounded-pill px-5 py-2 copy-btn fw-bold">
                Copy manager link
              </Link> */}

              {/* <button to="/rider-page" onClick={handleCopyLink}  className='rounded-pill py-3 px-5 text-decoration-none d-block w-100 btn-link mt-3 text-light'>
                Copy manager link
              </button> */}
              {copyFlashMessage.text && (
                <div className="flash-message" style={{ color: copyFlashMessage.color }}>
                  {copyFlashMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
        </Modal>
    </>
  );
}

export default Managerlinkmodal;