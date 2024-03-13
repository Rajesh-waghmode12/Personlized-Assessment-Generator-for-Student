import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RecentTests.css'

const RecentTests = () => {
  const [tests, setTests] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    // Here you would replace this with an actual API call to your backend
    const fetchData = async () =>{
      try {
        const response = await fetch('http://localhost:8000/tests/',{
          method : 'GET',
          headers : {
            'content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error("Network response was not okay");
        }

        const data = await response.json();
        console.log('Test Titles:', data.test_titles);
        setTests(data.test_titles);
      }catch(error){
        console.error('Error fetching test titles:', error);
      }
  }
  fetchData();
},[])

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
      <ul>
      <Link to="/quiz">
        {tests.map((title, index) => (
          <li key={index}>
            {title}
            <button>→</button>
          </li>
        ))}
        </Link>
      </ul>
      </div>
    </div>
  );
};

export default RecentTests;
