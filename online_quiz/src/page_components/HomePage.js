import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/HomePage.css";
import "../css/NavBar.css";
import AuthContext from "./AuthContext";
import CreateQuizButton from "./CreateQuizButton";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div id="home-container">
        <div className="header-container lg">
          <header>
            <h className="home-hdr fc-dark">Welcome to QuizHub!</h>
            <p className="home-p fc-dark">
              Enjoy your time by creating and playing quizzes on whichever
              topics you like!
            </p>
          </header>
          <p className="body-p">
            Get started by creating a new quiz or by playing already existing
            one! You can do that by either clicking the buttons below or by
            using navigation bar on the top of the page!
          </p>

          <div className="buttons-container">
            <Link to="/QuizPage">
              <button className="quiz-btn">Play a quiz</button>
            </Link>

            <CreateQuizButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
