import React, { useState } from 'react';
import './AddMemberModal.css'; // Make sure to create a corresponding CSS file

function AddMemberModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    // Logic to add the member
    console.log(name, mobile, email);
    // After adding, you can clear the fields or close the modal
    setName('');
    setMobile('');
    setEmail('');
    onClose(); // Close the modal
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
