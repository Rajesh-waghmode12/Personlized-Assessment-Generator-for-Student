import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SubjectDetailPage.css';
import AddMemberModal from '../../Popup/AddMember/AddMemberModal';


function SubjectDetailPage(){
  const { username } = useParams();

  const [testTitles, setTestTitles] = useState([]);
  const [members, setmembers] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await fetch(`http://localhost:8000/getmembers/?username=${username}`,{
          method : 'GET',
          headers : {
            'content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          throw new Error("Network response was not okay");
        }

        const data = await response.json();
        console.log('member names:', data.member_list);
        setmembers(data.member_list);
      }catch(error){
        console.error('Error fetching momber:', error);
      }
  }
  fetchData();
  },[username]);
  

  useEffect(()=>{
    const fetchData = async () =>{
        try {
          const response = await fetch(`http://localhost:8000/tests/?username=${username}`,{
            method : 'GET',
            headers : {
              'content-Type' : 'application/json'
            }
          })
          if(!response.ok){
            throw new Error("Network response was not okay");
          }

          const data = await response.json();
          console.log(data);
          console.log('Test Titles:', data.test_titles);
          setTestTitles(data.test_titles);
        }catch(error){
          console.error('Error fetching test titles:', error);
        }
    }
    fetchData();

  },[username]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="subject-detail-container">
      <div className="subject-header">
        <span className="username">{username}</span>
        <button className="logout-btn">
            Logout
        </button>
      </div>
      <div className="subject-section">
        <h2>Recent Tests</h2>
        {testTitles.map((title, index) => (
          <div key={index} className="test-date">{title}</div>
        ))}
        <Link to={`/createTest/${username}`} className="createTeast-button"><button>Create Test</button></Link>
        
      </div>
      <div className="subject-section">
        
        <h2>Members</h2>
        {members.map((member, index) => (
          <div key={index} className="test-date">{member}</div>
        ))}
        
        <button onClick={() => setIsModalOpen(true)}>Add Member</button>
        <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} username={username} />
      </div>
    </div>
  );
}

export default SubjectDetailPage;
