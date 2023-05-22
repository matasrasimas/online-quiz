import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/QuizPage.css";
import "../css/NavBar.css";
import Quiz from "./Quiz";
import CreateQuizButton from "./CreateQuizButton";
import Loading from "./Loading";
import ConfirmationModal from "./ConfirmationModal";
import AuthContext from "./AuthContext";
import SuccessPopup from "./SuccessPopup";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionsData, setQuestions] = useState([]);
  const [answersData, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [quizToDelete, setQuizToDelete] = useState(null);

  const [showMyQuizzes, setShowMyQuizzes] = useState(false);


  const modalRef = useRef(null);

  const {loggedUser, createQuizSuccess} = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/fetch_data.php?tableName=quizzes"
      );
      const result = await response.json();
      setQuizzes(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestionData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/fetch_data.php?tableName=questions"
      );
      const result = await response.json();
      setQuestions(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnswersData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/fetch_data.php?tableName=answers"
      );
      const result = await response.json();
      setAnswers(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionData();
    fetchAnswersData();
    fetchData();
  }, []);



  let filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(showMyQuizzes) {
    filteredQuizzes = filteredQuizzes.filter(quiz =>
      quiz.user_id === loggedUser.id);
  }


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleShowMyQuizzes = (event) => {
    setShowMyQuizzes(event.target.checked);
  };

  const onDelete = (quiz) => {
    setQuizToDelete(quiz);
  }

  const onConfirm = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/php/delete_quiz.php?quiz-id=${id}`
      );
      if (response.ok) {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
        setQuizToDelete(null);
      }
      
    } catch(error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Loading />;
  }

  // disable scrolling and tab navigation when confirmation modal is active
  if (quizToDelete) {
    document.body.style.overflow = 'hidden';
    document.body.tabIndex = -1;
    document.addEventListener('keydown', preventTab);
  } else {
    document.body.style.overflow = '';
    document.body.tabIndex = 0;
    document.removeEventListener('keydown', preventTab);
  }
  
  function preventTab(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }

  return (
    <>
      {quizzes.length > 0 ? (
        <>
          {createQuizSuccess && (<SuccessPopup message='Quiz has been created successfully!'/>)}
          
          <div className="quiz-hdr-cnt">
            <h className="fs-primary-heading fw-semi-bold">
              Quizzes quizzes quizzes!!!
            </h>
            <div className="p-btn">
              <p className="fs-650">Play as many as you'd like!</p>
              <CreateQuizButton />
             
            </div>
            <p className="fs-650">Total quizzes: {filteredQuizzes.length}</p>

            <div className="filters-container">

              <div className="search-container">
                <p className="label_text answer_text">Quiz search</p>
                <input
                  type="search"
                  id="search"
                  data-search
                  className="txt-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {loggedUser && (
                  <div className="my-quizzes-container">
                    <label className="label_text answer_text">Show only my quizzes:</label>
                    <input
                      id="my-quizzes"
                      className="chckbx-input"
                      type="checkbox"
                      onChange={toggleShowMyQuizzes}
                      
                    />
                  </div>
              )}

            </div>
            

          </div>

          

          <div className="container Quizzes-grid">
            {/*comment for line spacing, for readability*/}
            {filteredQuizzes.map((quiz) => {
              const quizQuestions = questionsData
                .filter((question) => question.quiz_id === quiz.id)
                .map((question) => {
                  const questionAnswers = answersData.filter(
                    (answer) => answer.question_id === question.id
                  );
                  return {
                    ...question,
                    answers: questionAnswers,
                  };
                });
              return (
                <Quiz 
                 key={quiz.id}
                 quiz={quiz}
                 questions={quizQuestions}
                 onDelete={onDelete}
                  />
              );
            })}
          

            {quizToDelete && (
              <ConfirmationModal
                 message={`Are you sure want to delete quiz: ${quizToDelete.name}?`}
                 onConfirm={() => onConfirm(quizToDelete.id)}
                 onCancel={() => {
                  setQuizToDelete(null);
                 }}
              />
            )}

          </div>
        </>
      ) : (
        <header className="primary-header">
          <div className="container">
            <h className="fs-primary-heading fw-semi-bold">
              No Quizzes to show! :(
            </h>
          </div>
        </header>
      )}
    </>
  );
};

export default QuizPage;
