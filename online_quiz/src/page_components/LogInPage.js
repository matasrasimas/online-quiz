import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import "../css/LogInPage.css";
import SuccessPopup from "./SuccessPopup";

const LogInPage = () => {
  const { setIsLoggedIn, setLoggedUser, createUserSuccess } = useContext(AuthContext);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/fetch_data.php?tableName=users"
      );
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    console.log(users);
    console.log(username);

    if (!username || !password) {
      setErrorMsg("Please fill all fields!");
      return false;
    }

    const userFromDb = users.find((user) => user.name === username);

    if (!userFromDb) {
      setErrorMsg("Incorrect username or password!");
      return false;
    }

    if (userFromDb.password !== password) {
      setErrorMsg("Incorrect password!");
      return false;
    }

    setIsLoggedIn(true);
    setLoggedUser(userFromDb);
    setErrorMsg("");
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Incorrect data!");
      return;
    }

    navigate("/HomePage");
  };

  const handleNavigation = () => {
    navigate("/LogInPage/RegisterPage");
  };

  return (
  <>
    {createUserSuccess && (<SuccessPopup message='Your account has been created successfully!'/>)}
    <div className="main-container">
      <header className="primary-header padding-block-700">
        <h className="fs-primary-heading fw-semi-bold">Login to QuizHub</h>
      </header>
      {errorMsg && <p className="error-msg-hdr">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form_item w-p-100 algn-cntr">
          <label className="label_text">Username:</label>
          <input
            id="username"
            className="form-control txt-input w-p-50"
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="form_item w-p-100 algn-cntr">
          <label className="label_text">Password:</label>
          <div className="password-input w-p-100">
            <input
              id="password"
              className="form-control txt-input w-p-50"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ paddingRight: "50px" }}
            />

            <i
              className={`fc-dark shw-psswd-icon fa-regular fa-eye${
                showPassword ? "-slash" : ""
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>

        <div className="btn-container algn-cntr">
          <button className="create-quiz-btn">Log In</button>
        </div>

        <div className="mrg-btm-50">
          <p className="home-p">
            Don't have an account yet?
            <a className="home-p register-link" onClick={handleNavigation}>
              Click here to create one!
            </a>
          </p>
        </div>
      </form>
    </div>
  </>
  );
};

export default LogInPage;
