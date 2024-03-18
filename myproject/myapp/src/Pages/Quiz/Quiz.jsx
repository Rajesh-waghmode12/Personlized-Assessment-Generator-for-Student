import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { Link,useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  //console.log(id);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [testQuestions, setTestQuestions] = useState([]);
  const [totalQuestions, setTotalQuetions] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:8000/getTestQuestions/?id=${id}`);
      //const data = await response.json();
      const data1 = await response.json();
      //console.log(data1.title[0].title);
      setTitle(data1.title[0].title);
      const data2 = data1.allTestQuestions[0].assignment_json;
      console.log(data2);
      setTestQuestions(data2);
      setTotalQuetions(data2.length);

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

  console.log(totalQuestions);
  const handleAnswerSelection = (index,question , selectedOption) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [index]: { question, selectedOption }
    }));
  };


  const handleSubmit = () =>{
    console.log(selectedAnswers);
    navigate('/TestScoreAndHomework');
  }

  

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">{title}</h1>
      {testQuestions.length > 0 ? (
        testQuestions.map((question, index) => (
          <div key={index} className='question-container'>
            <div className='question'>
              <p>Que {index + 1} : {question.question} </p>
              <label>Points: {question.mark}</label>
            </div>
            
            <div className='options'>
              <input type="radio" 
                name={question.question} 
                value={question.option1}
                onChange={() => handleAnswerSelection(index,question.question, question.option1)}
              />
              <label htmlFor={question.option1}>{question.option1}</label>
              
            </div>
        
            <div className='options'>
              <input type="radio" 
                name={question.question} 
                value={question.option2}
                onChange={() => handleAnswerSelection(index,question.question, question.option2)}
              />
              <label htmlFor={question.option2}>{question.option2}</label>
              
            </div>

             <div className='options'>
              <input type="radio" 
                name={question.question} 
                value={question.option3}
                onChange={() => handleAnswerSelection(index,question.question, question.option3)}
              />
              <label htmlFor={question.option3}>{question.option3}</label>
            </div>
            <div className='options'>
              <input type="radio" 
                name={question.question} 
                value={question.option4}
                onChange={() => handleAnswerSelection(index,question.question, question.option4)}
              />
              <label htmlFor={question.option4}>{question.option4}</label>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}

      <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
        {/* <Link to={"/TestScoreAndHomework"}>
        
        </Link> */}
    </div>
  );
};

export default Quiz;