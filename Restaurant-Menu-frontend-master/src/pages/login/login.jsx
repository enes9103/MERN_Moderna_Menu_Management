import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";

function Login() {
  const [isActive, setIsActive] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      Cookies.set("token", data.token);
      Cookies.set("Id", data.user);
      Cookies.set("role", data.role);

      alert(
        "You have registered successfully, we will send you an email for acceptance"
      );

      //// the email part where we add email js and the structure of the email

      ///////
      window.location.href = "/home";

      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
      // Show error alert
      alert("Registration failed");
    }
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };
  //   login function

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      Cookies.set("token", data.token);
      Cookies.set("Id", data.user);
      Cookies.set("role", data.role);

      alert("You have loged in successfully");

      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }

      console.log("Login successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
      // Show error alert
      alert("Log in failed");
    }
  };

  return (
    <div className={`auth-container ${isActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registeration</span>
          <input
            type="text"
            placeholder="Name"
            autoComplete="off"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message"> {error}</p>}
          <button type="submit" onClick={handleRegisterClick}>
            Sign Up
          </button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="error-message"> Invalid Credentials</p>}
          <a href="#">Forget Your Password?</a>
          <button type="submit" onClick={handleLoginClick}>
            Sign In
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${isActive ? "active" : ""}`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isActive ? "" : "active"}`}
          >
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button
              className="hidden"
              id="register"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
