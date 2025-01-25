import { useState } from 'react';
import toast from 'react-hot-toast';
import "../../css/adminLoginPage.css"; 
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }
  
    // Define the login request function
    const loginRequest = async () => {
      const response = await fetch(`${BACKEND_URI}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
  
      return response;
    };
  
    // Use toast.promise to handle the login flow
    toast
      .promise(
        loginRequest(),
        {
          loading: "Logging in...",
          success: "Login successful! Redirecting to dashboard...",
          error: "Login failed. Please try again.",
        }
      )
      .then(() => {
        navigate("/admin-dashboard"); // Redirect to admin dashboard after successful login
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Login error:", error);
      });
  };

  return (
    <div className="admin-container">
        

        <div className='admin_ana'>
            <h2 className='adminh2'>Admin Login</h2>
            <p className="admin-subtitle">This is for Admin Section . To check Bank Database !!!!</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      <div className="admin-login-box">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTYTl2yMmBxsZ0a2ijLpEyN-Px3HdVDWx2Q&s"
        alt="E-BANK Logo"
        className="e-bank-logo-admin"
      />
       
        <form onSubmit={handleSubmit} className='admin-form'>
          <div className="input-container">
            <input
              className="admin-input"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
            />
            <i className="icon user-icon"></i>
          </div>
          <div className="input-container">
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            <i className="icon lock-icon"></i>
          </div>
          {/* <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div> */}
          <button className="admin-btn" type="submit">Login</button>
          <p className="admin-login-link" onClick={() => navigate(`/`)}> For User login Click here !!</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
