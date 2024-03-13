import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('2');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        email,
        password,
        name,
        mobile,
        role,
    };
    try {
        const response = await fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert('Registration successful!');
            // Reset form fields after successful registration
            setEmail('');
            setPassword('');
            setName('');
            setMobile('');
            setRole(''); // Reset role field
            navigate(`/login`);
        } else {
            // Handle non-2xx responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Parse JSON response
                const data = await response.json();
                alert('Registration failed: ' + JSON.stringify(data));
            } else {
                // Handle non-JSON responses (e.g., HTML error pages)
                alert('Registration failed: ' + await response.text());
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering. Please try again later.');
    }
};
  return (
    <div className="register-wrapper">
      <div className='register-container'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input lassName="input-group"
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input lassName="input-group"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input lassName="input-group"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input lassName="input-group"
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="2">Student</option>
              <option value="1">Teacher</option>
            </select>
          </div>
        <button type="submit" className='register-button'>Register</button>
        <div className="helper-links">
            Already have an account? <Link to="/login">LOGIN</Link>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Register;
