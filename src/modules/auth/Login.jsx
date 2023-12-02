import React, { useState, useEffect } from "react";
import authLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { signIn } from "../../api/AuthApi";
import { useCookies } from 'react-cookie'; // Import useCookies hook
import { toastrOnTopCenter } from "../../utils/toastr";

const Login = () => {
  const navigate = useNavigate();
  const initialValue = {
    email: "",
    password: "",
  };

  const [processing, setProcessing] = useState(false);
  const [credential, setCredential] = useState(initialValue);
  const [cookies, setCookie] = useCookies(['auth_token']);

  const login = (e) => {
    e.preventDefault();
    setProcessing(true);

    signIn({ ...credential })
      .then((response) => {
        const { auth_token, exp } = response.data;
        setCookie('auth_token', auth_token);
        toastrOnTopCenter(response.message, "success")
        navigate('/dashboard');
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
        <h2>Hello, Welcome back!</h2>
        <p>A fire detection platform, powered by computer vision, ensures event safety by identifying fire hazards and managing emergencies. </p>
      </div>
      <form onSubmit={login}>
        <div className={styles.authContentForm}>
          <input type="email" placeholder="Email" value={credential.email} onChange={(e) => setCredential({ ...credential, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={credential.password} onChange={(e) => setCredential({ ...credential, password: e.target.value })} required />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Login"}
          </button>
        </div>
      </form>
      <p className={styles.loginForgotPassword}>
        <Link to="/register" className="me-3">Create an Account?</Link>
        <Link to="/reset-password">Forgot Password?</Link>
      </p>
    </>
  );
};

export default authLayout(Login);
