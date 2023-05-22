import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/HomePage.css";
import "../css/CreateQuiz.css";
import QuestionInput from "./QuestionInput";
import QuizInput from "./QuizInput";
import AuthContext from "./AuthContext";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [quizNames, setQuizNames] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [questions, setQuestions] = useState([
    { text: "", errorText: "", answers: [] },
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

  const {loggedUser, setCreateQuizSuccess, createQuizSuccess} = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/php/fetch_data.php?tableName=quizzes"
      );
      const quizzes = await response.json();
      setQuizNames(quizzes.map(quiz => quiz.name));
    } catch (error) {
      console.error(error);
    }
  };

 useEffect(() => {
   fetchData();
 }, []);


  const addQuestion = () => {
    setQuestions([...questions, { text: "", errorText: "", answers: [] }]);
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (indexToRemove) => {
    const newQuestions = questions.filter(
      (_, index) => index !== indexToRemove
    );
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({
      text: "",
      errorText: "",
      isCorrect: false,
    });
    setQuestions(newQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const updateCorrectAnswer = (event, questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].isCorrect =
      event.target.checked;
    setQuestions(newQuestions);
    console.log(newQuestions[questionIndex].answers[answerIndex].isCorrect);
  };

  const renderQuestions = () => {
    return questions.map((question, questionIndex) => (
      <QuestionInput
        questionIndex={questionIndex}
        question={question}
        handleQuestionChange={handleQuestionChange}
        handleQuestionBlur={handleQuestionBlur}
        removeQuestion={removeQuestion}
        addAnswer={addAnswer}
        handleAnswerChange={handleAnswerChange}
        handleAnswerBlur={handleAnswerBlur}
        removeAnswer={removeAnswer}
        updateCorrectAnswer={updateCorrectAnswer}
      />
    ));
  };

  // Method to check, if input text is empty or too short

  const validateName = (name) => {

    let errorFound = false;

    if(name.length === 0) {
      setNameError('Quiz name can\'t be empty!');
      errorFound = true;
    }
    else if(name.length <= 2) {
      setNameError('Quiz name is too short!');
      errorFound = true;
    }

    quizNames.forEach(quizName => {
      if(quizName.toLowerCase() === name.toLowerCase()) {
        setNameError('Quiz with that name already exists!');
        errorFound = true;
      }
    })

    const element = document.getElementById('name');
    if(errorFound) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;

    } else {
      setNameError('');
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
    }

  };


  const validateDescription = (description) => {
    
    let errorFound = false;

    if(description.length === 0) {
      setDescriptionError('Quiz description can\'t be empty!');
      errorFound = true;
    }
    else if(description.length <= 5) {
      setDescriptionError('Quiz description is too short!');
      errorFound = true;
    }

    const element = document.getElementById('description');
    if(errorFound) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;

    } else {
      setDescriptionError('');
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
    }

  };

  const validateCategory = (category) => {

    let errorFound = false;

    if(category.length === 0) {
      setCategoryError('Quiz category can\'t be empty!');
      errorFound = true;
    }
    else if(category.length <= 2) {
      setCategoryError('Quiz category is too short!');
      errorFound = true;
    }

    const element = document.getElementById('category');
    if(errorFound) {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;

    } else {
      setCategoryError('');
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
    }

  };


  const validateImageUrl = (url) => {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const element = document.getElementById('image-url');

    if (!urlRegex.test(url)) {
      setImageUrlError('Invalid URL address!');
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;
    }
    setImageUrlError('');
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    return true;
  };

  const validateQuestion = (questionIndex) => {

    const newQuestions = [...questions];
    let errorFound = false;

    if(newQuestions[questionIndex].text.length === 0) {
      newQuestions[questionIndex].errorText = 'Question can\'t be empty!';
      errorFound = true;
    }
    else if(newQuestions[questionIndex].text.length <= 5) {
      newQuestions[questionIndex].errorText = 'Question is too short!';
      errorFound = true;
    }

    else if(newQuestions[questionIndex].answers.length < 2) {
      newQuestions[questionIndex].errorText = 'Question must have at least 2 answers!';
      errorFound = true;
    }

    if(!errorFound) {

      let correctAnswersCount = 0;

      for(let i = 0; i < newQuestions[questionIndex].answers.length; i++) {
        if(newQuestions[questionIndex].answers[i].isCorrect) {
          correctAnswersCount++;
        }
      }
  
      if(correctAnswersCount === 0) {
        newQuestions[questionIndex].errorText = 'Question must have at least 1 correct answer!';
        errorFound = true;
      }

    }
    


    const element = document.getElementById(`question-${questionIndex}`);

    if(errorFound) {
      setQuestions(newQuestions);
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;

    } else {
      newQuestions[questionIndex].errorText = '';
      setQuestions(newQuestions);
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
    }

  };

  const validateAnswer = (questionIndex, answerIndex) => {

    const newQuestions = [...questions];
    const element = document.getElementById(`answer-${questionIndex}-${answerIndex}`);

    if(newQuestions[questionIndex].answers[answerIndex].text.length === 0) {
      newQuestions[questionIndex].answers[answerIndex].errorText = 'Answer can\'t be empty!';
      setQuestions(newQuestions);
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      return false;
    }

    newQuestions[questionIndex].answers[answerIndex].errorText = '';
    setQuestions(newQuestions);
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    return true;
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  // handleBlur method for main quiz attributes only (name, description, category, imageUrl)
  const handleBlur = (
    value,
    validateMethod,
  ) => {
    validateMethod(value);
  };

  const handleQuestionBlur = (questionIndex) => {
    

    const element = document.getElementById(`question-${questionIndex}`);
    const newQuestions = [...questions];

    if (newQuestions[questionIndex].text.length === 0) {
      newQuestions[questionIndex].errorText = "Question can\'t be empty!";
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");

    } else if (newQuestions[questionIndex].text.length <= 5) {
      newQuestions[questionIndex].errorText = "Question is too short!";
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");

    } else {
      newQuestions[questionIndex].errorText = "";
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    }
    setQuestions(newQuestions);
  };


  const handleAnswerBlur = (questionIndex, answerIndex) => {
    const element = document.getElementById(
      `answer-${questionIndex}-${answerIndex}`
    );
    const newQuestions = [...questions];

    if (newQuestions[questionIndex].answers[answerIndex].text.length === 0) {
      newQuestions[questionIndex].answers[answerIndex].errorText =
        "Answer can\'t be empty!";
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    } else {
      newQuestions[questionIndex].answers[answerIndex].errorText = "";
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    }
    setQuestions(newQuestions);
  };


  const validateForm = () => {


    // Validate questions and answers
    let errorFound = false;

    for (let i = 0; i < questions.length; i++) {
      if (!validateQuestion(i))
        errorFound = true;
        for (let j = 0; j < questions[i].answers.length; j++) {
          if (!validateAnswer(i, j))
            errorFound = true;
        }
        
    }

    if (!validateName(name) |
        !validateDescription(description) |
        !validateCategory(category) |
        !validateImageUrl(imageUrl) |
        errorFound) {
      setErrorMsg('Please fill all fields correctly!');
      window.scrollTo({top : 0, behavior: 'smooth'});
      return false;
    }

    // Check if quiz have at least one question
    if (questions.length === 0) {
      setErrorMsg('Quiz must have at least 1 question!');
      window.scrollTo({top : 0, behavior: 'smooth'});
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check, if submitted data is correct/valid
    if (!validateForm()) {
      console.log("Incorrect data!");
      return;
    }

    const formData = new FormData();

    // Add main quiz attributes to the FormData object
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("imageUrl", imageUrl);
    formData.append("user-id", loggedUser.id);

    // Add the questions array to the FormData object
    formData.append("questions", JSON.stringify(questions));

    try {
      // Make POST request to the server (PHP file)
      const response = await fetch(
        "http://localhost:8000/php/insert_quiz.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setErrorMsg("");
        console.log("Data inserted successfully!");
        console.log(questions);
        console.log(questions.answers);
        setCreateQuizSuccess(true);
        navigate("/QuizPage"); // this will redirect to '/QuizPage' path
      } else {
        console.log("There was an error inserting data: ", response.statusText);
      }
    } catch (error) {
      console.log("There was an error inserting data: ", error);
    }
  };

  return (
    <div className="main-container">
      <header  className="primary-header padding-block-700">
        <h className="fs-primary-heading fw-semi-bold">Create Quiz</h>
      </header>
      {errorMsg && <h className="error-msg-hdr">{errorMsg}</h>}
      <form onSubmit={handleSubmit}>
        <QuizInput
          header="Quiz name:"
          name="name"
          value={name}
          handleChange={handleNameChange}
          handleBlur={() =>
            handleBlur(
              name,
              validateName,
            )
          }
          errorMsg={nameError}
        />

        <QuizInput
          header="Quiz description:"
          name="description"
          value={description}
          handleChange={handleDescriptionChange}
          handleBlur={() =>
            handleBlur(
              description,
              validateDescription,
            )
          }
          errorMsg={descriptionError}
        />

        <QuizInput
          header="Quiz category:"
          name="category"
          value={category}
          handleChange={handleCategoryChange}
          handleBlur={() =>
            handleBlur(
              category,
              validateCategory,
            )
          }
          errorMsg={categoryError}
        />

        <QuizInput
          header="Quiz image URL:"
          name="image-url"
          value={imageUrl}
          handleChange={handleImageUrlChange}
          handleBlur={() =>
            handleBlur(
              imageUrl,
              validateImageUrl,
            )
          }
          errorMsg={imageUrlError}
        />

        {renderQuestions()}

        <div className="button-container">
          <button type="button" className="quiz-btn" onClick={addQuestion}>
            Add question
          </button>
          <button type="submit" className="create-quiz-btn">
            Create!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
