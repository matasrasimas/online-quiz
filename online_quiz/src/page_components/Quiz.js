import React, {useContext} from "react";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";
import defaultImg from "../assets/default.jpg";
import "../css/NavBar.css";
import "../css/QuizPage.css";

const Quiz = ({ quiz, questions, onDelete }) => {

  const { isLoggedIn, loggedUser } = useContext(AuthContext);

  return (
    <>
      <div className="Quiz-cont">
        <div className="even-columns">
          <div className="stuff-go-center padding-block-400">
            <p className="fw-bold fs-600">{quiz.name}</p>
            <p className="fw-semi-bold fs-500">{quiz.description}</p>
          </div>
          <div className="img-with-x">
            <img
              className="img-small Quiz-img-bord"
              src={quiz.image_url ? quiz.image_url : defaultImg}
              alt="This was supposed to be something else"
            />
            {(isLoggedIn && loggedUser.id === quiz.user_id) && (
              <i class="x-icon fa-solid fa-xmark" onClick={() => onDelete(quiz)}></i>
            )}
            
          </div>
        </div>
        <div className="even-columns stuff-go-center">
          <p className="fw-semi-bold fs-600 temp-mg-zero-text">
            {quiz.category}
          </p>
          <Link to="/QuizPage/Question" state={{ questions }}>
            <button className="quiz-button">Solve</button>
          </Link>
          <Link to="/QuizPage/Leaderboard" state={{ quiz }}>
            <button className="quiz-button">Leaderboard</button>
          </Link>
          <p className="fw-semi-bold fs-600 temp-mg-zero-text">
            Questions : {questions.length}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Quiz;
