import React from "react";
import "../css/AboutPage.css";
import "../css/NavBar.css";
import logo1 from "../assets/aboutPage1.jpg";
import logo2 from "../assets/aboutPage2.jpg";
import logo3 from "../assets/aboutPage3.jpg";
import logo4 from "../assets/aboutPage4.avif";
import quotelogo from "../assets/quote.png";

const AboutPage = () => {
  return (
    /**Mostly text that explains our situation and our goals + images */
    <>
      <header className="primary-header padding-top-600">
        <div className="container">
          <h className="fs-primary-heading fw-semi-bold">About us</h>
        </div>
      </header>

      <section className="padding-block-700">
        <div className="container even-columns padding-block-300 gradient-border-rl">
          <div className="centered-text">
            <p className="fs-500 padding-top-300 padding-inline-300">
              Our team is a group of passionate students who have come together
              to create a fun and engaging quiz platform on the internet. We
              believe that learning can be both entertaining and educational,
              and our platform aims to provide just that. We have combined our
              diverse skill sets in programming, design, and marketing to bring
              this project to life.
            </p>
          </div>
          <img
            className="image-container stuff-go-center img-medium"
            src={logo1}
            alt=""
          />
        </div>
      </section>

      <section className="padding-block-700">
        <div className="container even-columns padding-block-300 gradient-border-rr">
          <img
            className="image-container stuff-go-center img-medium"
            src={logo2}
            alt=""
          />
          <div className="centered-text">
            <p className="fs-500 padding-top-300 padding-inline-300">
              Our quiz platform is designed to cater to a wide range of users,
              from students to adults who are looking to test their knowledge on
              various topics. We have created an intuitive user interface that
              is easy to navigate, making it accessible to everyone. We offer a
              variety of quizzes, ranging from general knowledge to specialized
              subjects, to cater to the different interests of our users.
            </p>
          </div>
        </div>
      </section>

      <section className="padding-block-700">
        <div className="container even-columns padding-block-300 gradient-border-rl">
          <div className="centered-text">
            <p className="fs-500 padding-top-300 padding-inline-300">
              As a team, we have worked tirelessly to ensure that our quiz
              platform is of the highest quality. We have conducted extensive
              research, testing, and development to make sure that the platform
              is user-friendly and offers an excellent user experience. Our goal
              is to make learning fun and accessible to everyone, and we believe
              that our quiz platform is a step in that direction.
            </p>
          </div>
          <img
            className="image-container stuff-go-center img-medium"
            src={logo3}
            alt=""
          />
        </div>
      </section>

      <section className="padding-block-700">
        <div className="container even-columns padding-block-300 gradient-border-rr">
          <img
            className="image-container stuff-go-center img-medium"
            src={logo4}
            alt=""
          />
          <div className="centered-text">
            <p className="fs-500 padding-top-300 padding-inline-300">
              We are thrilled to have created this quiz platform and are excited
              about the possibilities it offers. We hope to continue to develop
              and improve our platform to cater to the needs of our users and
              provide an enjoyable learning experience. We are grateful for the
              opportunity to work together as a team and for the support we have
              received from our peers and mentors.
            </p>
          </div>
        </div>
      </section>

      <section className="padding-block-700">
        <div className="container qoute-container">
          <div>
            <img className="circle-image img-small " src={quotelogo} alt="" />
          </div>

          <div className="centered-text padding-top-600">
            <p className="fw-bold fs-650">
              "We have revolutionized how people think. Bing chilling"
            </p>
            <p className="fw-semi-bold fs-600">
              – Aurimas Gasparas, CEO of QuizHub
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
