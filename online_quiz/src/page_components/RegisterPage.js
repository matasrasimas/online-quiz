import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QuizInput from "./QuizInput";
import "../css/NavBar.css";
import "../css/LogInPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const {createUserSuccess, setCreateUserSuccess} = useContext(AuthContext);

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const validateUsername = () => {
    let errorFound = false;

    if (username.length === 0) {
      setUsernameError("Username can't be empty!");
      errorFound = true;
    } else if (username.length <= 2) {
      setUsernameError("Username is too short!");
      errorFound = true;
    } else if (users.find((user) => user.name === username)) {
      setUsernameError("This username is already taken!");
      errorFound = true;
    }

    const element = document.getElementById("username");

    if (errorFound) {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    } else {
      setUsernameError("");
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const element = document.getElementById("email");

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email!");
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    } else {
      setEmailError("");
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true;
    }
  };

  const validatePassword = () => {
    let errorFound = false;
    const element = document.getElementById("password");

    // Regex, that checks, if password contains at least one capital letter
    const regex1 = /.*[A-Z].*/;

    // Regex, that checks, if password contains at least one digit
    const regex2 = /.*\d.*/;

    // Regex, that checks, if password contains at least one special character (, . - _ ? !)
    const regex3 = /.*[,.\-_?!].*/;

    const passwordRequirements = [];

    if (!regex1.test(password)) {
      passwordRequirements.push("at least 1 capital letter");
    }

    if (!regex2.test(password)) {
      passwordRequirements.push("at least 1 digit");
    }

    if (!regex3.test(password)) {
      passwordRequirements.push("at least 1 special character (, . - _ ? !)");
    }

    if (password.length === 0) {
      setPasswordError("Password can't be empty!");
      errorFound = true;
    } else if (password.length < 8) {
      setPasswordError("Password is too short!");
      errorFound = true;
    } else if (passwordRequirements.length !== 0) {
      const passwordRequirementsString = `password must contain:<br> ${passwordRequirements
        .map((req) => `• ${req}`)
        .join("<br>")}`;
      setPasswordError(passwordRequirementsString);
      errorFound = true;
    }

    if (errorFound) {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    } else {
      setPasswordError("");
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true;
    }
  };

  const validatePassword2 = () => {
    const element = document.getElementById("password2");

    if (password !== password2) {
      setPassword2Error("Passwords don't match!");
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    } else {
      setPassword2Error("");
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true;
    }
  };

  const handleBlur = (value, validateMethod) => {
    validateMethod(value);
  };

  const validateForm = () => {
    if (
      !validateUsername() |
      !validateEmail() |
      !validatePassword() |
      !validatePassword2()
    ) {
      setErrorMsg("Please fill all fields correctly!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Incorrect data!");
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Make POST request to the server (PHP file)
      const response = await fetch(
        "http://localhost:8000/php/insert_user.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setErrorMsg("");
        console.log("Data inserted successfully!");
        setCreateUserSuccess(true);
        navigate("/LogInPage");
      }
    } catch (error) {
      console.log("There was an error inserting data:", error);
    }
  };

  const handleNavigation = () => {
    navigate("/LogInPage");
  };

  return (
    <div className="main-container">
      <header className="primary-header padding-block-700">
        <h className="fs-primary-heading fw-semi-bold">Create an account</h>
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
            onBlur={() => handleBlur(username, validateUsername)}
          />
          {usernameError && <p className="error-msg">{usernameError}</p>}
        </div>

        <div className="form_item w-p-100 algn-cntr">
          <label className="label_text">Email:</label>
          <input
            id="email"
            className="form-control txt-input w-p-50"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur(email, validateEmail)}
          />
          {emailError && <p className="error-msg">{emailError}</p>}
        </div>

        <div className="form_item w-p-100 algn-cntr">
          <label className="label_text">Password:</label>
          <div className="password-input w-p-100">
            <input
              id="password"
              className="form-control txt-input w-p-50 rm-img"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ paddingRight: "50px", backgroundImage: "none" }}
              onBlur={() => handleBlur(password, validatePassword)}
            />

            <i
              className={`fc-dark shw-psswd-icon fa-regular fa-eye${
                showPassword ? "-slash" : ""
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          {passwordError && (
            <p
              className="error-msg"
              dangerouslySetInnerHTML={{ __html: passwordError }}
            ></p>
          )}
        </div>

        <div className="form_item w-p-100 algn-cntr">
          <label className="label_text">Confirm password:</label>
          <div className="password-input w-p-100">
            <input
              id="password2"
              className="form-control txt-input w-p-50"
              type={showPassword2 ? "text" : "password"}
              name="password2"
              value={password2}
              onChange={handlePassword2Change}
              style={{ paddingRight: "50px", backgroundImage: "none" }}
              onBlur={() => handleBlur(password2, validatePassword2)}
            />

            <i
              className={`fc-dark shw-psswd-icon fa-regular fa-eye${
                showPassword2 ? "-slash" : ""
              }`}
              onClick={togglePassword2Visibility}
            ></i>
          </div>

          {password2Error && <p className="error-msg">{password2Error}</p>}
        </div>

        <div className="btn-container  algn-cntr">
          <button className="create-quiz-btn">Create account</button>
        </div>

        <div className="mrg-btm-50">
          <p className="home-p">
            Already have an account?
            <a className="home-p register-link" onClick={handleNavigation}>
              Click here to log in!
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
