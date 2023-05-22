import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/HomePage.css";
import "../css/CreateQuiz.css";

const QuizInput = ({
  header,
  name,
  value,
  handleChange,
  handleBlur,
  errorMsg,
}) => {
  return (
    <div className="form_item">
      <label className="label_text">{header}</label>
      <input
        id={name}
        className="form-control w-p-100 txt-input"
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default QuizInput;
