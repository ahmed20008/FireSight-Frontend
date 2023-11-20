import React, { useState } from 'react'
import authLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { toastrOnTopCenter } from '../../utils/toastr';
import { signUp } from '../../api/AuthApi';

const Regsiter = () => {
  const navigate = useNavigate();
  const initialValue = {
    username: "",
    email: "",
    password: "",
  };

  const [signupData, setSignupData] = useState(initialValue);
  const [processing, setProcessing] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    signUp({ ...signupData })
      .then((response) => {
        console.log(response)
        toastrOnTopCenter(response.message, "success");
      })
      .catch((errors) => {
        // setErrorBag(errors);
        toastrOnTopCenter(errors.message, "error")
      })
      .finally(() => {
        setProcessing(false);
      });

  };
  return (
    <>
      <div className={styles.authContentHeading}>
        <h2>Welcome to Fire Sight.</h2>
        <p>A fire detection platform, powered by computer vision, ensures event safety by identifying fire hazards and managing emergencies. </p>
      </div>
      <form onSubmit={handleRegister}>
        <div className={styles.authContentForm}>
          <input type="text" placeholder="Username" value={signupData.username} onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} required />
          <input type="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p className={styles.loginForgotPassword}>
        <Link to="/" className="me-3">Login</Link>
      </p>
    </>
  )
}

export default authLayout(Regsiter);