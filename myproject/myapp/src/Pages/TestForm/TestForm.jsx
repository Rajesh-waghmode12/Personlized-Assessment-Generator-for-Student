import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import './TestForm.css';


// The main form component
const TestForm = () => {
  const { username } = useParams();

  const [inputFields, setInputFields] = useState([
    {question:"",mark: "", option1:"", option2:"",option3:"", option4:"", correct:""}
  ]);

  const handleFormChange = (index,event) =>{
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newField = {question:"", option1:"", option2:"",option3:"", option4:"", correct:""}
    setInputFields([...inputFields,newField])
  }
  
  const [testTitle, setTestTitle] = useState('');
  const[totalMarks, settotalMarks] = useState('');
  
  const handleTitleChange = (e) => {
    setTestTitle(e.target.value);
  };

  const handleMarksChange = (e) =>{
    settotalMarks(e.target.value);
  }

  const submitForm = async (e) =>{
    e.preventDefault();
    if (testTitle === '') {
      alert('Please enter a title');
      return; // Prevent form submission if title is empty
    }
    if (totalMarks === '') {
      alert('Please enter marks');
      return; // Prevent form submission if title is empty
    }
    console.log(inputFields);

      const formData = {
        username : username,
        title : testTitle,
        totalmarks : totalMarks,
        test : inputFields
      };
    try {
        const response = await fetch('http://localhost:8000/testCreation/',{
          method : 'POST',
          headers : {
            'content-Type' : 'application/json'
          },
          body : JSON.stringify(formData)
        });
        if (response.ok) {
          alert("Assignment created",response.assignment_id);
        }
    }catch(error){

    }

  }
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  }

  
 
  return (
    <div>
    <div>
        <div className='subject-header'>
          <span className="username">{username}</span>
          <button className="logout-btn">
              Logout
          </button>
        </div>
          <form onSubmit={submitForm}>
            <div className='title-marks-field'>

              <input type="text" name='question' placeholder='Enter title here' 
              value={testTitle}
              onChange={handleTitleChange} required/>
              <input type="text" name='marks' placeholder='marks'className='marks-field'
              value={totalMarks}
              onChange={handleMarksChange} required/>

            </div>

            {inputFields.map((input, index) => { 
              return (
                <div className='questionForm'>
            <div key={index} className='questions'>
              <div className='question-mark-field'>
              <input type="text" name='question' placeholder='Enter question here' 
              value={input.question}
              onChange={event => handleFormChange(index, event)}/>

              <input type="number" name='mark' placeholder='mark' className='mark-field'
              value={input.mark}
              onChange={event => handleFormChange(index, event)}/>
              </div>
              
              <input type="text" name='option1' placeholder='option' className='option'
               value={input.option1}
               onChange={event => handleFormChange(index, event)}
               />
              <input type="text" name='option2' placeholder='option' className='option'
              value={input.option2}
              onChange={event => handleFormChange(index, event)}
              />
              <input type="text" name='option3' placeholder='option' className='option'
              value={input.option3}
              onChange={event => handleFormChange(index, event)}/>
              <input type="text" name='option4' placeholder='option' className='option'
              value={input.option4}
              onChange={event => handleFormChange(index, event)}/>
              <input type="text" name='correct' placeholder='correct answer' className='option'
              value={input.correct}
              onChange={event => handleFormChange(index, event)}/>
              </div>
              <div className='remove-button'>
                <button onClick={() => removeFields(index)}>Remove</button>
            </div>
            </div>
            )
            })}
            <button onClick={addFields} className='addmor-button'>Add More..</button>
            <button onClick={submitForm} className='submit-button'>Submit</button>
          </form>
        </div>
    </div>
  );
};

export default TestForm;
