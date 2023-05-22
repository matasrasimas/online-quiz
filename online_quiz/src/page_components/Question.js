import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Question.css";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo, useState, useEffect } from "react";
import $, { type } from "jquery";

export default function Question({ loggedUser }) {
  let timer = 10;
  let intervalIds = [];
  const [allScores, setAllScores] = useState([]);
  const [questionIndex, setIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const startButton = document.getElementById("start_btn");
    const nextButton = document.getElementById("next_btn");
    const questionCounter = document.getElementById("question_counter1");
    const questionContainerElement =
      document.getElementById("question_container");
    const questionElement = document.getElementById("question");
    const answerButtonsElement = document.getElementById("answer_buttons");
    let tempScores;
    let score;

    let shuffleQuestions, currentQuestionIndex;

    startButton.addEventListener("click", () => {
      setQuizStarted(true);

      clearIntervals();
      $(".timer").text(" ");
      startGame();
    });
    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex + 1 === data.questions.length) {
        questionCounter.classList.add("hide");
        endScreen();
      } else {
        currentQuestionIndex++;
        setNextQuestion();
      }
    });

    //TIMER
    //------------------------------------------------------------------------
    function normalTimer() {
      clearIntervals();
      timer = 15;
      $(".timer").text(15);

      // Start the progress bar at 0
      const progressBar = document.getElementById("timer-progress");
      progressBar.value = 0;

      intervalIds.push(
        setInterval(() => {
          timer--;
          $(".timer").text(timer);
          // Increase the progress bar
          progressBar.value = 15 - timer;

          if (timer < 0) {
            $(".timer").text("0");
            clearIntervals();
            if (shuffleQuestions.length > currentQuestionIndex + 1) {
              nextButton.classList.remove("hide");
            } else {
              endScreen();
            }
            Array.from(answerButtonsElement.children).forEach((button) => {
              setStatusClass(button, button.dataset.correct);
              button.classList.add("no-click");
            });
          }
        }, 1000)
      );
    }

    function clearIntervals() {
      for (var i = 0; i < intervalIds.length; i++) {
        clearInterval(intervalIds[i]);
      }
    }
    //----------------------------------------------------------------------------------------

    async function fetchScore() {
      try {
        const response = await fetch(
          "http://localhost:8000/php/fetch_data.php?tableName=scores"
        );
        const result = await response.json();
        tempScores = result;
      } catch (error) {
        console.error(error);
      }
    }

    function startGame() {
      clearIntervals();
      $(".timer").text(" ");
      console.log("Started");
      score = 0;
      fetchScore();
      console.log(loggedUser);

      document.querySelector(".timer").toggleAttribute("data-visible");
      //questionCounter.classList.remove("hide");
      answerButtonsElement.classList.remove("hide");
      nextButton.innerText = "Next";
      $(".quiz_score").text("Current score: " + score);
      questionElement.classList.remove("hide");
      questionCounter.classList.remove("hide");
      answerButtonsElement.classList.remove("hide");
      startButton.classList.add("hide");
      shuffleQuestions = data.questions
        .sort(() => Math.random() - 0.5)
        .map((e) => {
          e.answers.sort(() => Math.random() - 0.5);
          return e;
        });
      currentQuestionIndex = 0;
      questionContainerElement.classList.remove("hide");
      document.getElementById("timer-progress-bar").classList.remove("hide");

      //console.log(data.questions.length);
      setNextQuestion();
    }

    function showQuestion(question) {
      normalTimer();
      questionElement.innerText = question.name;
      question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.name;
        button.classList.add("question_btn");
        if (answer.isCorrect === "1") {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
      });
    }

    function setNextQuestion() {
      resetState();
      showQuestion(shuffleQuestions[currentQuestionIndex]);
    }

    function resetState() {
      nextButton.classList.add("hide");
      while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
      }
    }

    function selectAnswer(e) {
      clearIntervals();
      $(".timer").text(" ");
      const selectedButton = e.target;
      const correct = selectedButton.dataset.correct;
      selectedButton.classList.add("focus");
      setStatusClass(document.body, correct);
      Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
        button.classList.add("no-click");
      });
      if (correct) {
        calculateScore();
      }
      if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
      } else if (currentQuestionIndex + 1 === shuffleQuestions.length) {
        nextButton.classList.remove("hide");
        nextButton.innerText = "Finish";
      }
    }

    function endScreen() {
      clearIntervals();
      $(".timer").text(" ");
      document.getElementById("timer-progress-bar").classList.add("hide");
      questionCounter.classList.add("hide");
      answerButtonsElement.classList.add("hide");
      nextButton.classList.add("hide");
      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
      $(".quiz_score").text("");
      const printScore = document.getElementById("question");
      printScore.classList.add("result_screen");
      document.querySelector(".timer").toggleAttribute("data-visible");
      const userPersonaBest = loggedUser ? userPersonalBestScore() : 0;
      if (userPersonaBest < score) {
        printScore.innerText =
          "YOU GOT " +
          score +
          " POINTS\n" +
          (loggedUser ? "You surpassed your personal best!\n" : "") +
          "Hit 'Restart' for a better score!";
      } else {
        printScore.innerText =
          "YOU GOT " +
          score +
          " POINTS\n" +
          "Your personal best score is " +
          userPersonaBest +
          "\n" +
          "Hit 'Restart' for a better score!";
      }

      if (loggedUser != null) {
        setUserScore(); //Each restart it causes the page to rerender an additional time
      }
    }

    function setStatusClass(element, correct) {
      clearStatusClass(element);
      if (correct) {
        element.classList.add("correct");
      } else {
        element.classList.add("wrong");
      }
    }

    function clearStatusClass(element) {
      element.classList.remove("correct");
      element.classList.remove("wrong");
    }

    function calculateScore() {
      score = score + timer * 100;
      $(".quiz_score").text("Current score: " + score);
    }

    async function updateScore() {
      try {
        const scores = new FormData();
        const fk_user = loggedUser.id;
        scores.append("fk_user", fk_user);
        scores.append("score", score);
        scores.append("fk_quizID", data.questions[0].quiz_id);

        // Make POST request to the server (PHP file)
        const response = await fetch(
          "http://localhost:8000/php/update_user_score.php",
          {
            method: "POST",
            body: scores,
          }
        );

        if (response.ok) {
          console.log("Score updated successfully!");
          console.log(score);
        } else {
          console.log(
            "There was an error updating data: ",
            response.statusText
          );
        }
      } catch (error) {
        console.log("There was an error updating data: ", error);
      }
    }

    async function insertScore() {
      try {
        const scores = new FormData();
        const fk_user = loggedUser.id;
        scores.append("fk_user", fk_user);
        scores.append("score", score);
        scores.append("fk_quizID", data.questions[0].quiz_id);

        // Make POST request to the server (PHP file)
        const response = await fetch(
          "http://localhost:8000/php/insert_user_score.php",
          {
            method: "POST",
            body: scores,
          }
        );

        if (response.ok) {
          console.log("Score inserted successfully!");
          console.log(score);
        } else {
          console.log(
            "There was an error inserting data: ",
            response.statusText
          );
        }
      } catch (error) {
        console.log("There was an error inserting data: ", error);
      }
    }

    function setUserScore() {
      const userPlayedQuiz = didUserPlayQuiz();
      const userGotPersonalBest = didUserGetPersonalBest();
      //console.log(userPlayedQuiz + " " + userGotPersonalBest);
      if (userPlayedQuiz && userGotPersonalBest) {
        updateScore();
      } else if (!userPlayedQuiz) {
        insertScore();
      }
    }

    function userPersonalBestScore() {
      var fk_user = loggedUser.id;
      for (var i = 0; i < tempScores.length; i++) {
        if (
          tempScores[i].fk_user == fk_user &&
          tempScores[i].fk_quizID == data.questions[0].quiz_id
        ) {
          return tempScores[i].score;
        }
      }
      return 0;
    }

    function didUserGetPersonalBest() {
      var fk_user = loggedUser.id;
      for (var i = 0; i < tempScores.length; i++) {
        if (
          tempScores[i].fk_user == fk_user &&
          tempScores[i].fk_quizID == data.questions[0].quiz_id &&
          tempScores[i].score <= score
        ) {
          console.log("personal best: true");
          return true;
        }
      }
      console.log("played best: false");
      return false;
    }

    function didUserPlayQuiz() {
      var userID = loggedUser.id;
      for (var i = 0; i < tempScores.length; i++) {
        if (
          tempScores[i].fk_user == userID &&
          tempScores[i].fk_quizID == data.questions[0].quiz_id
        ) {
          console.log("played quiz: true");
          return true;
        }
      }
      console.log("played quiz: false");
      return false;
    }
  }, []);

  function handleClick() {
    //console.log(questionIndex);
    if (questionIndex === data.questions.length) {
      setIndex(questionIndex - data.questions.length);
      document.getElementById("question_counter1").classList.add("hide");
    } else {
      setIndex(questionIndex + 1);
    }
  }

  return (
    <main>
      <div className="question_body">
        {/* <h1> </h1> */}
        <div className="timer"></div>
        <div className="question-page_container">
          <div id="question_container" className="hide">
            <p id="question_counter1" className="hide">
              Question {questionIndex} of {data.questions.length}
            </p>
            <div id="question">Question</div>
            <div id="answer_buttons" className="btn-grid">
              <button className="question_btn">Answer1</button>
              <button className="question_btn">Answer2</button>
              <button className="question_btn">Answer3</button>
              <button className="question_btn">Answer4</button>
            </div>
          </div>
          <div id="timer-progress-bar" className="hide">
            <progress id="timer-progress" value="0" max="15"></progress>
          </div>
          <div className="controls">
            <button
              id="start_btn"
              className="start_button question_btn"
              onClick={handleClick}
            >
              Start
            </button>
            <button
              id="next_btn"
              className="next_button question_btn hide"
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        </div>
        <div className="quiz_score"></div>
      </div>
    </main>
  );
}
