import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";
import profile from "./../assets/User.svg";
import eye from "./../assets/eye.svg";
import passwordIcon from "./../assets/password.svg";
import nextLogo from "./../assets/next-arrow.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordFeild = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    setError("");
    setSuccessMessage("");
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email cannot be empty");
      setTimeout(() => {
        setEmailError("");
      }, 3000);
      return;
    }

    if (!password) {
      setPasswordError("Password cannot be empty");
      setTimeout(() => {
        setPasswordError("");
      }, 3000);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setSuccessMessage("Login successful!");
        navigate("/gallery");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        setError("User does not exist");
        setTimeout(() => {
          setError("");
        }, 4000);
      });
  };

  return (
    <div className="login">
      <div class="contain">
        <h1 className="heading">Welcome Back!</h1>
        <form>
          <div className="input-box">
            <img src={profile} alt="profile icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="input-box">
            <img src={passwordIcon} alt="Password icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img src={eye} alt=" see password" onClick={togglePasswordFeild} />
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <p className="forgot-pass">Forgot Password?</p>
        </form>

        <div className="signin-wrapper">
          <button className="signin-text">Sign In</button>
          <div className="signin-icon" onClick={handleLogin}>
            <img src={nextLogo} alt="next logo" />
          </div>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className=" error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
