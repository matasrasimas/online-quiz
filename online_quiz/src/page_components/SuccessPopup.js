import React, {useState, useEffect, useRef, useContext} from 'react'
import AuthContext from './AuthContext';
import '../css/SuccessPopup.css';

const SuccessPopup = ({message}) => {

  const [visible, setVisible] = useState(true);

  const {setCreateQuizSuccess, setCreateUserSuccess} = useContext(AuthContext);

  const popupRef = useRef(null);

  useEffect(() => {

    if(visible) {
        const timeout = setTimeout(() => {
            popupRef.current.classList.add('fade-out');
            setTimeout(() => {
               setVisible(false);
               setCreateQuizSuccess(false);
               setCreateUserSuccess(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }, 3000)         
    }
     
  }, []);

  const handleClose = () => {
    setVisible(false);
    setCreateQuizSuccess(false);
    setCreateUserSuccess(false);
  }

  return (
    <>
      {visible && (
        <div className='success-container' ref={popupRef}>
          <div className='success-content'>
             <header>
                <p>Success!</p>
                <i class="text-light fa-solid fa-xmark" onClick={handleClose}></i>
             </header>
             <div className='success-msg'>
                <p>{message}</p>
                <i class="fa-solid fa-square-check"></i>
             </div>
            
            </div>
        </div>
      )}
    </>
    
  )
}

export default SuccessPopup