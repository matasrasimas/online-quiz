import React from "react";
import "../css/HowToPage.css";

export default function HowToPage() {
  return (
    /**Text and images that explain how to use our quiz platform */
    <>
      <header className="primary-header padding-top-600">
        <div className="container">
          <h className="fs-primary-heading fw-semi-bold">How to use QuizHub</h>
          <p className="fs-500 padding-top-300">
            Welcome to QuizHub, the fun and engaging quiz platform! We have
            designed our platform to be user-friendly and easy to navigate so
            that everyone can enjoy learning through our quizzes. Here's how to
            get started:
          </p>
        </div>
      </header>

      <section className="padding-block-700">
        <div className="container even-columns stuff-go-center padding-block-300 gradient-border-rl">
          <div className="centered-text">
            <h className="fs-secondary-heading fw-semi-bold">
              Create an account
            </h>
            <p className="fs-500 padding-top-300">
              The first step to using QuizHub is to create an account. Simply
              click on the <span className="fw-bold">"Log In"</span> button on
              the top right corner of the homepage, then press on the
              highlighted text{" "}
              <span className="fw-bold">"Click here to create one!"</span> and
              fill out the registration form. You'll then be able to log into
              the website.
            </p>
          </div>

          <iframe
            className="iframe-embed"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Ab2TZ7FxC4k"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section className="padding-block-700">
        <div className="container even-columns stuff-go-center padding-block-300 gradient-border">
          <div className="container centered-text">
            <h className="fs-secondary-heading fw-semi-bold ">
              Browse our quizzes
            </h>
            <p className="fs-500 padding-top-300">
              Once you've signed up and logged in, you'll be able to create your
              own quizzes! You can also filter quizzes by their name, search for
              specific topics or simply scroll through our featured quizzes and
              you can also toggle a checkbox to show only the quizzes that you
              have created. Click on the{" "}
              <span className="fw-semi-bold">"Solve"</span> button inside the
              quiz box to start playing the quiz.
            </p>
          </div>

          <iframe
            className="iframe-embed"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MePCOkbkp2s"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section className="padding-block-700">
        <div className="container even-columns stuff-go-center padding-block-300 gradient-border-rr">
          <div className="container centered-text">
            <h className="fs-secondary-heading fw-semi-bold ">Take a quiz</h>
            <p className="fs-500 padding-top-300">
              Our quizzes are designed to be fun and educational. They consist
              of multiple-choice questions with different levels of difficulty.
              You'll have a limited amount of time to answer each question, so
              make sure to read carefully and choose your answer wisely. At the
              end of the quiz, you'll receive your score and be notified if you
              beat your personal best.
            </p>
          </div>
          <iframe
            className="iframe-embed"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/PhZ9v4DUHgg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <footer className="padding-block-400 container">
        <h className="fs-secondary-heading fw-semi-bold">Contact Us</h>
        <p className="fs-500 padding-top-300">
          We hope you enjoy using QuizHub as much as we enjoyed creating it. If
          you have any questions or feedback, please don't hesitate to contact
          us. You can reach us through the contact form on our website or by
          sending an email to{" "}
          <span className="fw-bold">support@quizhub.com</span>.
        </p>
      </footer>
    </>
  );
}
