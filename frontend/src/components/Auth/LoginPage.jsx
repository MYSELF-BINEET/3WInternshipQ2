import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import "../../css/loginPage.css";

const LoginPage = () => {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Define the login logic as a function
    const loginRequest = async () => {
      const response = await fetch(`${BACKEND_URI}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      // Save tokens if login is successful
      Cookies.set("accessToken", data.data.accessToken, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "none",
      });
      Cookies.set("refreshToken", data.data.refreshToken, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "none",
      });
  
      return data;
    };
  
    // Use toast.promise to manage the promise state
    toast
      .promise(
        loginRequest(),
        {
          loading: "Logging in... Please Wait Some time ....",
          success: "Login successful! ",
          error: "Login failed. Please try again.",
        }
      )
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      {/* Replace the heading with an image */}
      <img
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTYTl2yMmBxsZ0a2ijLpEyN-Px3HdVDWx2Q&s"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXsVDigmVB-9l8jbey8TkBrJ6p-xzggNRXg&s"
        alt="E-BANK Logo"
        className="e-bank-logo1"
      />

      <div className="login-box">
        <h2>Login to Your Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="in1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="in1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn1log" type="submit">
            Sign In
          </button>
          <p className="admin-login-link" onClick={() => navigate(`/admin-login`)}> For admin login Click here !!</p>
        </form>
        {/* <div className="admin-login-container">
          <h2 className="admin-login-title">Admin Login</h2>
          <button className="btn2" onClick={() => navigate(`/admin-login`)}>
            Admin Login
          </button>
        </div> */}
      </div>

      <div className="signup-box">
        <h2>New Here?</h2>
        <p>Sign up and Create Bank Account!</p>
        <button className="btn1log" onClick={() => navigate(`/register`)}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
