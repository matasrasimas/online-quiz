import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/HomePage.css";
import "../css/CreateQuiz.css";

const QuestionInput = ({
  questionIndex,
  question,
  handleQuestionChange,
  handleQuestionBlur,
  removeQuestion,
  addAnswer,
  handleAnswerChange,
  handleAnswerBlur,
  removeAnswer,
  updateCorrectAnswer,
}) => {
  return (
    <div key={questionIndex} className="form_item">
      <label
        htmlFor={`question-${questionIndex}`}
        className="label_text"
      >{`Question ${questionIndex + 1}:`}</label>
      <input
        id={`question-${questionIndex}`}
        name={`question-${questionIndex}`}
        className="form-control txt-input"
        type="text"
        value={question.text}
        onChange={(event) => handleQuestionChange(event, questionIndex)}
        onBlur={() => handleQuestionBlur(questionIndex)}
      />
      {question.errorText && <p className="error-msg">{question.errorText}</p>}

      <div className="btn-container">
        {question.answers.length < 4 && (
          <div className="add-btn-container">
            <button
              type="button"
              className="quiz-btn"
              onClick={() => addAnswer(questionIndex)}
            >
              Add answer
            </button>
          </div>
        )}

        <div className="rm-btn-container">
          <button
            type="button"
            className="quiz-btn"
            onClick={() => removeQuestion(questionIndex)}
          >
            Remove question
          </button>
        </div>
      </div>

      {question.answers.map((answer, answerIndex) => (
        <div key={answerIndex} className="answer-container">
          <div className="form_item">
            <label className="label_text answer_text">{`Answer ${
              answerIndex + 1
            }:`}</label>
            <input
              id={`answer-${questionIndex}-${answerIndex}`}
              className="form-control txt-input"
              type="text"
              value={answer.text}
              onChange={(e) =>
                handleAnswerChange(e, questionIndex, answerIndex)
              }
              onBlur={() => handleAnswerBlur(questionIndex, answerIndex)}
            />
            {answer.errorText && (
              <p className="error-msg">{answer.errorText}</p>
            )}

            <div className="add-btn-container">
              <button
                type="button"
                className="quiz-btn"
                onClick={() => removeAnswer(questionIndex, answerIndex)}
              >
                Remove answer
              </button>
            </div>
          </div>

          <div className="form_item">
            <label className="label_text answer_text">Is correct:</label>
            <input
              id={`correct-answer-${questionIndex}-${answerIndex}`}
              className="chckbx-input"
              type="checkbox"
              onChange={(e) =>
                updateCorrectAnswer(e, questionIndex, answerIndex)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
