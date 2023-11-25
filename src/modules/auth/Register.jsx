import React, { useState } from 'react'
import authLayout from "../../layout/AuthLayout";
import { Link } from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { toastrOnTopCenter } from '../../utils/toastr';
import { signUp } from '../../api/AuthApi';

const Regsiter = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const [signupData, setSignupData] = useState(initialValue);
  const [processing, setProcessing] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setProcessing(true);

    signUp({ ...signupData })
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
      })
      .catch((errors) => {
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
          <input type="text" placeholder="Name" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Sign Up"}
          </button>
        </div>
      </form>
      <p className={styles.loginForgotPassword}>
        <Link to="/" className="me-3">Login</Link>
      </p>
    </>
  )
}

export default authLayout(Regsiter);