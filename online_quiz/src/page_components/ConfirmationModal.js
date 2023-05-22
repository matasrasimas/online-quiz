
import React, {useState, useRef} from "react";

const ConfirmationModal = ({message, onConfirm, onCancel}) => {

    const modalRef = useRef(null);

    const handleClick = (type) => {
        modalRef.current.classList.add('pop-out');
        setTimeout(() => {
            type === 'yes' ? onConfirm() : onCancel();
            modalRef.current.classList.remove('pop-out');
        }, 150);
    }

    return (
        <div className="modal-container">
            <div className="modal-content" ref={modalRef}>
                <header>
                    <p>Confirmation</p>
                    <i class="text-light bg-dark fa-solid fa-xmark" onClick={() => handleClick('no')}></i>
                </header>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={() => handleClick('yes')}>Yes</button>
                    <button onClick={() => handleClick('no')}>No</button>
                </div>
            </div>
        
        </div>
    );
}

export default ConfirmationModal;