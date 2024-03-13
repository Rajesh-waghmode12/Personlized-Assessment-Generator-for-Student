import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './subjectspage.css';
import { useNavigate } from 'react-router-dom';
import subjectpageimage from '../../Images/subjectpageimage.png'; // Update the path as per your project structure
import DropdownMenu from '../Dropdown/dropdown';
import AddSubjectModal from '../../Popup/AddSubject/AddSubjectModal';
import ManageProfilePopup from '../../Popup/ManageProfilePopup'
import SubjectDetailPage from '../SubjectDetailPage/SubjectDetailPage';

function SubjectsPage() {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  // const [user, setUser] = useState({
  //   name: 'John Doe',
  //   mobile: '123-456-7890',
  //   email: 'john.doe@example.com',
  // });
  // const [showModal, setShowModal] = useState(false);

  

  const handleUpdateUser = (updatedUser) => {
    // Here you would typically send the updated user data to your server
    // For now, we'll just update the state
    //setUser(updatedUser);
};



  const [subjects, setSubjects] = useState(['Physics', 'Chemistry', 'Math']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSubject = (subjectName) => {
    setSubjects([...subjects, subjectName]);
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
  
      if (response.ok) {
        // Handle successful logout
        console.log('Logout successful');
      } else {
        // Handle error response
        const data = await response.json();
        console.error('Logout failed:', data);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };
  
  const allSubjects = [
    { id: 1, name: 'Physics' },
    { id: 2, name: 'Chemistry' },
    { id: 3, name: 'Math' }
    // ... more subjects
  ];

  const navigate = useNavigate();
  const handleSubjectClick = (subjectId) => {
    
  };

  return (
    <div className="subjects-page">
      <nav className="navbar">
        <div className="nav-left">
          <h1>Subjects</h1>
        </div>
        <div className="nav-right">
              <AddSubjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddSubject}
              />

          <button onClick={() => setIsModalOpen(true)} className="create-class-btn">
            Create Class
          </button>
          <span className="username">Username</span>
          <button className="logout-btn" onClick={logout()}>
            Logout
          </button>
        </div>
      </nav>
      <div className='content'>
        <div className='left_content'>
          
        </div>
        <div className="right_content">
          <img src={subjectpageimage} alt="" className='subjectpageimage' />
        </div>
      </div>
    </div>
  );
}

export default SubjectsPage;