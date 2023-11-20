import React, { useState } from "react";
import authLayout from "../../layout/AuthLayout";
import { Link } from "react-router-dom";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { forgetPassword } from "../../api/AuthApi";
import { toastrOnTopCenter } from "../../utils/toastr";

const ResetPassword = () => {
  const initialValue = {
    email: "",
  };
  const [forgotPassword, seForgotPassword] = useState(initialValue);
  const [processing, setProcessing] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    forgetPassword({ ...forgotPassword })
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
      })
      .catch((errors) => {
        // setErrorBag(errors);
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  }
  return (
    <>
      <div className={styles.authContentHeading}>
        <h2>Password Reset</h2>
        <p>Type in your email, and we’ll send an email to reset your password.</p>
      </div>
      <form onSubmit={sendEmail}>
        <div className={styles.authContentForm}>
          <input type="email" placeholder="Email" value={forgotPassword.email} onChange={(e) => seForgotPassword({ ...forgotPassword, email: e.target.value })} required />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">Send Verification Link</button>
        </div>
      </form>
      <p className={styles.loginForgotPassword}>
        <Link to="/">Go Back to Login</Link>
      </p>
    </>
  );
};

export default authLayout(ResetPassword);
