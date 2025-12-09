import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('2');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
      role,
    };
    
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        //console.log(response.text);
        const data = await response.json();
        console.log(data.role);
        if (data.role == 2){
          navigate(`/recentTests/${data.username}`);
        }
        else if (data.role == 1){
          //navigate('/subjectpage');
          navigate(`/subjectpage/${data.username}`);
        }
        
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }

  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>
          <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="2">Student</option>
              <option value="1">Teacher</option>
            </select>
          </div>
          <div className="form-footer">
            <button type="submit" className="login-button">Login</button>
            <div className="helper-links">
              <Link to ="/forget-password">Forget Password</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
