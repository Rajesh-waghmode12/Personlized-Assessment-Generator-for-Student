import React, { useState } from 'react';
import './ManageProfilePopup.css';

function ManageProfilePopup({ show, onClose, user, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateUser(editableUser); // Replace with actual update logic
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Manage Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editableUser.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={editableUser.mobile}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editableUser.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <button type="button" className="save-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ManageProfilePopup;
