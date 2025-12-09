import './TestScoreAndHomework.css';
import React, { useContext } from 'react';
import DataContext from '../DataContext';

const TestScoreAndHomework = () => {
  const { quizData } = useContext(DataContext);
  const {studentName, total, achieved, title, homework } = quizData;

  const sections = homework.split('*');
  const renderSections = () => {
    return sections.map((section, index) => (
      <div key={index}>
        {section.trim() && ( // Only render non-empty sections
          <>
            <h4>{section}</h4>
          </>
        )}
      </div>
    ));
  };
  console.log(studentName,achieved,total,title);
  return (
    <div className="test-homework-container">
      <div className="test-score">
        <h4>{studentName}</h4>
        <h3>{title}</h3>
        <div className="score-card">
          <p>Marks Obtained</p>
          <h2>{achieved}/{total}</h2>
          
        </div>
      </div>
      <div className="homework">
        <h3>Please Solve Below Assessment on Your Textbook</h3>
        <div className="homework-questions">
          {renderSections()}
        </div>
      </div>
    </div>
  );
};

export default TestScoreAndHomework;
