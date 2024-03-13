import React, { useState } from 'react';
import './profilemodal.css'; // Make sure you create a corresponding CSS file

function ProfileModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle profile update
    console.log('Profile Updated:', { name, mobile, email });
    onClose(); // Close modal after submit
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>Edit Profile</h2>
            <button onClick={onClose} className="close-button">&times;</button>
          </div>
          <div className="modal-body">
            <label>
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Mobile
              <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div className="modal-footer">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
