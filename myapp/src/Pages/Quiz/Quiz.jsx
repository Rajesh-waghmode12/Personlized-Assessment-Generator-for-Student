import React, { useState, useEffect, useContext } from 'react';
import './Quiz.css';
import {useNavigate, useParams } from 'react-router-dom';
import DataContext from '../DataContext';

const Quiz = () => {
  const { id, username } = useParams();
  //console.log(id);
  //console.log(username);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [testQuestions, setTestQuestions] = useState([]);
  //const [totalQuestions, setTotalQuetions] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { setQuizData } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [modalText , setModeltext] = useState("Are ou sure ?");

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:8000/getTestQuestions/?id=${id}`);
      //const data = await response.json();
      const data1 = await response.json();
      //console.log(data1.title[0].title);
      setTitle(data1.title[0].title);
      const data2 = data1.allTestQuestions[0].assignment_json;
      //console.log(data2);
      setTestQuestions(data2);
      //setTotalQuetions(data2.length);


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

  //console.log(totalQuestions);
  const handleAnswerSelection = (index,question , selectedOption) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [index]: { question, selectedOption }
    }));
  };


  const handleSubmit = async () =>{
    closeModal();
    setModeltext("Sumitted! Wait for a While...");
    openModal();
    //console.log(selectedAnswers);
    const formData = {
      studentName : username,
      testId : id,
      testTitle : title,
      answersheet : selectedAnswers
    }

    try {
      const response = await fetch('http://localhost:8000/submitTest/',{
        method : 'POST',
        headers : {
          'content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
        
      }
      const responseData = await response.json(); // Parse the JSON response
     
      console.log("testTitle:",responseData.testTitle);
      console.log("marks_achieved:", responseData.marks_achieved);
      console.log("Total Marks:", responseData.total_marks);
      const achieved = responseData.marks_achieved;
      const total = responseData.total_marks;
      const title = responseData.testTitle;
      const homework = responseData.homework;
      setQuizData({
        studentName: username,
        total: total,
        achieved: achieved,
        title: title,
        homework:homework
    });
      
      //alert("Test Submitted");
      navigate('/TestScoreAndHomework');
    }catch(error){
      console.log(error);
    }
    
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

      <button type="submit" className="submit-btn" onClick={openModal}>Submit</button>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalText}</p>
            <div className="button-container">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;