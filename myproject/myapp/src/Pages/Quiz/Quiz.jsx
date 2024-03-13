import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Here you would fetch the questions from your API
    // This is a placeholder for where you would make the API call
    const fetchQuestions = async () => {
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      const data = [
        {
          id: 1,
          questionText: 'Question 1',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        {
          id: 2,
          questionText: 'Question 2',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        },
        // ... more questions
      ];
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: option
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission of the answers
    // Likely sending them to your API
    alert('Submit answers');
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">Test Title/Date</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="question">
            <h3>{question.questionText}</h3>
            <div className="options">
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={option}
                    name={`question_${question.id}`}
                    checked={selectedOptions[question.id] === option}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <Link to={"/TestScoreAndHomework"}>
        <button type="submit" className="submit-btn">Submit</button>
        </Link>
      </form>
    </div>
  );
};

export default Quiz;