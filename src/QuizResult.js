import React from "react";
import "./Quiz.css";

const QuizResult = ({ score, correctAns, length, handleReExam }) => {
  return (
    <>
      <div className="score-section">
        <h2>Completed!</h2>
        <h3>Total Score {score}/{length*5}</h3>
        <h3>
          Your Correct Question {correctAns} out of {length}
        </h3>
        <button
          type="button"
          onClick={handleReExam}
        >
          Re Exam
        </button>
      </div>
    </>
  );
};

export default QuizResult;
