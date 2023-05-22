import React, { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/HomePage.css";
import "../css/NavBar.css";
import AuthContext from "./AuthContext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CreateQuizButton = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const handleMouseOver = () => {
    if(popupRef.current) {
      popupRef.current.style.display = "block";
    }
    
  };

  const handleMouseOut = () => {
    if(popupRef.current) {
      popupRef.current.style.display = "none";
    }
  };

  return (
    <div className="btn-with-popup-container">
      <Link to={isLoggedIn ? "/QuizPage/CreateQuiz" : ""}>
        <button
          className={`quiz-btn ${!isLoggedIn && 'disabled'}`}
          ref={buttonRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Create a quiz
        </button>
      </Link>

      {!isLoggedIn && (
        <div className="popup-container" ref={popupRef}>
          <div className="popup-content">
            <p className="fc-dark">
              You have to be logged in to create your own quizzes!
            </p>
            <i class="fa-sharp fa-solid fa-triangle-exclamation"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizButton;
