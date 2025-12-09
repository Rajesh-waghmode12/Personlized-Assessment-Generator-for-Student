import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css'; // Make sure this path is correct for your project
import ManageProfilePopup from '../../Popup/ManageProfilePopup'

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [user, setUser] = useState({
    name: 'John Doe',
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
  });
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    // Here you would typically send the updated user data to your server
    // For now, we'll just update the state
    setUser(updatedUser);
  };

  return (
    <div className="dropdown-container">
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className="manage-profile-text" onClick={handleOpenModal} role="button" tabIndex="0">
            Manage Profile
          </div>
            <ManageProfilePopup
            show={showModal}
              onClose={handleCloseModal}
              user={user}
              updateUser={handleUpdateUser}
            />
      
          <Link to="/settings">Settings</Link>
          <Link to="/logout">Logout</Link>
          {/* Add more menu items here */}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
