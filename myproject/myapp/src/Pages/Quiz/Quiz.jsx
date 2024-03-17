import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { Link, useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  //console.log(id);
  const [testQuestions, setTestQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:8000/getTestQuestions/?id=${id}`);
      //const data = await response.json();
      const data1 = await response.json();
      setTestQuestions(data1.allTestQuestions[0].assignment_json)
      const data2 = data1.allTestQuestions[0].assignment_json;
      setTestQuestions(data2);

        // Log the first question and its options
        // console.log("Question:", testQuestions[0].question);
        // console.log("Options:");
        // console.log("Option 1:", testQuestions[0].option1);
        // console.log("Option 2:", testQuestions[0].option2);
        // console.log("Option 3:", testQuestions[0].option3);
        // console.log("Option 4:", testQuestions[0].option4);
        // console.log("Mark:", testQuestions[0].mark);
    
    };

    fetchQuestions();
  }, [id]);

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">title</h1>
      {testQuestions.length > 0 ? (
        testQuestions.map((question, index) => (
          <div key={index}>
            <p>Question: {question.question} <label>Mark: {question.mark}</label></p>
            <p>Options:</p>
            <div>
              <label for={question.option1}>{question.option1}</label>
              <input type="radio" name={question.question} value={question.option1}/>
            </div>
        
            <div>
              <label for={question.option2}>{question.option1}</label>
              <input type="radio" name={question.question} value={question.option2}/>
            </div>

             <div>
              <label for={question.option3}>{question.option1}</label>
              <input type="radio" name={question.question} value={question.option3}/>
            </div>

            <div>
              <label for={question.option4}>{question.option1}</label>
              <input type="radio" name={question.question} value={question.option4}/>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
        <Link to={"/TestScoreAndHomework"}>
        <button type="submit" className="submit-btn">Submit</button>
        </Link>
    </div>
  );
};

export default Quiz;