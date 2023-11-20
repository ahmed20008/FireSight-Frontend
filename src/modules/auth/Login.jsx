import React, { useState } from "react";
import authLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { signIn } from "../../api/AuthApi";
// import { useSignIn } from "react-auth-kit";
import { toastrOnTopCenter } from "../../utils/toastr";

const Login = () => {
  const navigate = useNavigate();
  // const setAuthCookie = useSignIn();
  const initialValue = {
    email: "",
    password: "",
  };

  const [processing, setProcessing] = useState(false);
  const [credential, setCredential] = useState(initialValue);

  const login = (e) => {
    e.preventDefault();

    signIn({ ...credential })
      .then((response) => {
        console.log(response)
        toastrOnTopCenter(response.message, "success")
        // let isAuthCookiesSet = setAuthCookie({
        //   token: response.data.auth_token,
        //   expiresIn: response.data.exp,
        //   tokenType: "Bearer",
        //   authState: {},
        // });

        // if (isAuthCookiesSet) {
        //   navigate("/dashboard");
        // } else {
        //   toastrOnTopCenter("Something went wrong, try later", "error");
        // }
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
        <h2>Hello, Welcome back!</h2>
        <p>A fire detection platform, powered by computer vision, ensures event safety by identifying fire hazards and managing emergencies. </p>
      </div>
      <form onSubmit={login}>
        <div className={styles.authContentForm}>
          <input type="email" placeholder="Email" value={credential.email} onChange={(e) => setCredential({ ...credential, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={credential.password} onChange={(e) => setCredential({ ...credential, password: e.target.value })} required />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">Login</button>
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
