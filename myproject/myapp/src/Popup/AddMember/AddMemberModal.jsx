import React, { useState } from 'react';
import './AddMemberModal.css'; // Make sure to create a corresponding CSS file

function AddMemberModal({ isOpen, onClose, username }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(name, mobile, email,"teacher - username - ",username);
    setName('');
    setMobile('');
    setEmail('');
    onClose(); 
    const formData = {
      username : username,
      name : name,
      mobile : mobile,
      email : email
    };
  try {
      const response = await fetch('http://localhost:8000/addStudentinclass/',{
        method : 'POST',
        headers : {
          'content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Member added");
      }
  }catch(error){
    console.log(error);
  }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <span className="close-button" onClick={onClose}>&times;</span>
        </div>
        <h2>Add Member</h2>
        <input 
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="tel"
          placeholder="Enter mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input 
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default AddMemberModal;
