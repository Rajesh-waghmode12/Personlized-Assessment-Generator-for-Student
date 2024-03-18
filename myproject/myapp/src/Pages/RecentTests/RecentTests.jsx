import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RecentTests.css'

const RecentTests = () => {
  const [testTitles, setTestTitles] = useState([]);
  const [testIds, setTestIds] = useState([]);
  const { username } = useParams();

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
      <div className="recent-test">
      <h2>Recent Tests</h2>
      <div>
      
        
        {testIds.map((id, index) => (
          <Link to={`/quiz/${id}`} key={index}>
        <div className='tests-list' key={index}>
         <input className='ids' type="text" value={id} readOnly/>
         <input type="text" value={testTitles[index]} readOnly/>
          <button>→</button>
        </div>
         </Link>
        ))}
       
        </div>
      </div>
    </div>
  );
};

export default RecentTests;
