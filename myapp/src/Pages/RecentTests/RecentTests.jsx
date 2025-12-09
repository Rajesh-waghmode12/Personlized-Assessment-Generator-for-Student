import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RecentTests.css'

const RecentTests = () => {
  const [testTitles, setTestTitles] = useState([]);
  const [testIds, setTestIds] = useState([]);
  const { username } = useParams();

  const[attemptedTests,setAttemptedTests] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
        try {
          const response = await fetch(`http://localhost:8000/recentTestForStudent/?username=${username}`,{
            method : 'GET',
            headers : {
              'content-Type' : 'application/json'
            }
          })
          if(!response.ok){
            throw new Error("Network response was not okay");
          }

          const data = await response.json();
          //console.log('Test Titles:', data.unique_titles_list);
          //console.log('Test ids:', data.unique_ids);
          setTestTitles(data.unique_titles_list);
          setTestIds(data.unique_ids);
        }
        catch(error){
          console.error('Error fetching test titles:', error);
        }
    }

    const fetchAttempted = async() =>{
        const response = await fetch(`http://localhost:8000/attemptedTests/?username=${username}`,{
          method : 'GET',
          headers : {
            'content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error("Network response was not okay");
        }
        const data = await response.json();
        setAttemptedTests(data.test);
    }
    fetchAttempted();
    fetchData();

  },[username]);

  return (
    <div className="recent-tests-container">
      <div className="header">
        <span className="username">{username}</span>
        <button className="logout-btn">
            Logout
        </button>
      </div>
      <div className='testbody'>
      <div className="recent-test">
        <h2>Recent Tests</h2>
        <div className="recent-tests-container">
          {testIds.map((id, index) => (
            <Link to={`/quiz/${username}/${id}`} key={index}>
            <div className='recent-tests-list' key={index}>
              <input className='ids' type="text" value={id} readOnly/>
              <input type="text" value={testTitles[index]} readOnly/>
              <button>→</button>
            </div>
          </Link>
          ))}
          </div>
        </div>
        <div className="attempted-test">
        <h2>Attempted Tests</h2>
        <div className="attempted-tests-container">
          {attemptedTests.map(test => (
            <div className='attempted-tests-list' key={test.assignment_id}>
              <input className='ids' type="text" value={test.assignment_id} readOnly/>
              <input type="text" value={test.title} readOnly/>
              <button>→</button>
            </div>
          ))}
          </div>
        </div>
        </div>
    </div>
  );
};

export default RecentTests;
