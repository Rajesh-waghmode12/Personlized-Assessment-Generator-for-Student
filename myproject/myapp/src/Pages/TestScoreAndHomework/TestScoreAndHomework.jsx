import React from 'react';
import './TestScoreAndHomework.css';

const TestScoreAndHomework = ({ score, total, homework }) => {
  return (
    <div className="test-homework-container">
      <div className="test-score">
        <h1>Physics 13 Oct 2023</h1>
        <div className="score-card">
          <h2>Your Score</h2>
          <p>{score}/{total}</p>
        </div>
      </div>
      <div className="homework">
        <h1>Please Solve Below Assessment on Your Textbook</h1>
        <div className="homework-questions">
          {/* Assuming homework is an array of strings */}
          {homework.map((question, index) => (
            <p key={index}>{question}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestScoreAndHomework;
