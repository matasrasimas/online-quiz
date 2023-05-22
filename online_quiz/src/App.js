import React, { useState, useEffect } from "react";
import AuthContext from "./page_components/AuthContext";
import AboutPage from "./page_components/AboutPage";
import HowToPage from "./page_components/HowToPage";
import HomePage from "./page_components/HomePage";
import QuizPage from "./page_components/QuizPage";
import NoPage from "./page_components/NoPage";
import NavBar from "./page_components/NavBar";
import Question from "./page_components/Question";
import LogInPage from "./page_components/LogInPage";
import Leaderboard from "./page_components/Leaderboard";
import RegisterPage from "./page_components/RegisterPage";
import { Route, Routes } from "react-router-dom";
import QuestionInput from "./page_components/QuestionInput";
import CreateQuiz from "./page_components/CreateQuiz";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [createQuizSuccess, setCreateQuizSuccess] = useState(false);
  const [createUserSuccess, setCreateUserSuccess] = useState(false);

  // Load user data from local storage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save user data to local storage when user logs in or logs out
  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [loggedUser]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          loggedUser,
          setLoggedUser,
          createQuizSuccess,
          setCreateQuizSuccess,
          createUserSuccess,
          setCreateUserSuccess,
        }}
      >
        <NavBar />

        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/HowToPage" element={<HowToPage />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route
            path="/QuizPage/Leaderboard"
            element={<Leaderboard loggedUser={loggedUser} />}
          />
          <Route
            path="/QuizPage/Question"
            element={<Question loggedUser={loggedUser} />}
          />
          <Route path="/QuizPage/CreateQuiz" element={<CreateQuiz />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          <Route path="/LogInPage/RegisterPage" element={<RegisterPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>

      <footer>{/*footer*/}</footer>
    </>
  );
};

export default App;
