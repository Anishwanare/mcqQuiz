import React, { useState } from "react";
import "./Quiz.css";
import questions from "./QuizData";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [quizRes, setQuizRes] = useState(false);
const [selectedOptions, setSelectedOptions] = useState(
  Array(questions.length).fill(null)
);


const handleAnsOption = (isCorrect, optionIndex) => {
  const updatedSelectedOptions = [...selectedOptions];
  updatedSelectedOptions[currentQuestion] = optionIndex;
  setSelectedOptions(updatedSelectedOptions);

  if (isCorrect) {
    setScore(score + 5);
    setCorrectAns(correctAns + 1);
  } else {
    // Decrease score if changing from a correct option to an incorrect one
    if (
      selectedOptions[currentQuestion] !== null &&
      questions[currentQuestion].questionOption[
        selectedOptions[currentQuestion]
      ].isCorrect
    ) {
      setScore(score - 5);
      setCorrectAns(correctAns - 1);
    }
  }
};




  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizRes(true);
    }
  };
  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1;
    setCurrentQuestion(previousQuestion);
  };

  const handleReExam = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAns(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setQuizRes(false);
  };


  return (
    <>
      <div
        className=""
        style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
      >
        <h3>Test app by D&W tech pathrot</h3>
      </div>
      <div className="app">
        {quizRes ? (
          <QuizResult
            score={score}
            correctAns={correctAns}
            length={questions.length}
            handleReExam={handleReExam}
          />
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="question-text">
                <h3>{questions[currentQuestion].questionText}</h3>
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].questionOption.map((option, i) => {
                const isSelected = selectedOptions[currentQuestion] === i;
                const optionClassName = isSelected
                  ? "button selected"
                  : "button";

                return (
                  <button
                    onClick={() => handleAnsOption(option.isCorrect, i)}
                    className={optionClassName}
                    key={i}
                    type="button"
                  >
                    {option.answerText}
                  </button>
                );
              })}

              <div className="actions">
                <button
                  type="button"
                  onClick={() => alert("You want to quit Exam")}
                >
                  Quit
                </button>
                <button type="button" onClick={handlePreviousQuestion}>
                  Previous
                </button>
                <button type="button" onClick={handleNextQuestion}>
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
