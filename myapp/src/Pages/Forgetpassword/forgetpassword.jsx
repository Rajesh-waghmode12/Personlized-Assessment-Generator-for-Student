import React, { useState } from 'react';
import './forgetpassword.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the password reset logic here. For now, just log to the console
    console.log('Email for password reset:', email);
    // You might want to call an API endpoint to initiate the password reset process
  };

  return (
    <div className="forget-password-wrapper">
      <div className="forget-password-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <p>Please enter your email address. You will receive a link to create a new password via email.</p>
          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="form-footer">
            <button type="submit" className="reset-button">Send Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
