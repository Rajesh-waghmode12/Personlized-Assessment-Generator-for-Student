import React, { useState } from 'react';
import './AddSubjectModal.css';

const AddSubjectModal = ({ isOpen, onClose, onAdd }) => {
  const [newSubject, setNewSubject] = useState('');
  const formData = {
    newSubject,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("class Created !!")
      }else{
        alert("Respons ok , Error for creating class !!")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error for creating class');
    }
    setNewSubject('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add New Subject</h2>
        <form onSubmit={handleSubmit} className='addSubjectForm'>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Subject Name"
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className='addSubject-btn'>
              Cancel
            </button>
            <button type="submit" className='addSubject-btn'>OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddSubjectModal;
