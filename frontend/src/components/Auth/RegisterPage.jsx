import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/registerPage.css';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful!');
        navigate('/'); // Redirect to login page after successful registration
      } else {
        setError(data.message); // Show error message from API
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTYTl2yMmBxsZ0a2ijLpEyN-Px3HdVDWx2Q&s" 
        alt="E-BANK Logo" 
        className="e-bank-logo" 
      />
      <div className="login-box">
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input className='in1'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className='in1'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input  className='in1'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn1reg" type="submit">Register</button>
        </form>
        {/* <button className="login-button" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button> */}
        
      </div>
      <div className="signup-box">
        <h2>Already have an account?</h2>
        <button className="btn1reg" onClick={() => navigate(`/`)}>Login</button>
      </div>
    </div>
  );
};

export default RegisterPage;
