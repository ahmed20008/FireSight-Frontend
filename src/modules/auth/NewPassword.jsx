import React, { useState } from "react";
import authLayout from "../../layout/AuthLayout";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { toastrOnTopCenter } from "../../utils/toastr";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const { id, resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const UpdatePasswordData = {
    password: password,
    id: id,
    token: resetToken,
  };

  const resetPassword = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toastrOnTopCenter("The passwords you entered do not match. Please make sure both passwords are the same.", "error");
      return;
    }
    else {
      // API call here 
    }
  };
  console.log("User ID:", id);
  console.log("Reset Token:", resetToken);
  return (
    <>
      <div className={styles.authContentHeading}>
        <h2>Set New Password</h2>
        <p>Set up a new password and we’ll take you to the login page</p>
      </div>
      <form onSubmit={resetPassword}>
        <div className={styles.authContentForm}>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.authSubmitbutton}>
          <button type="submit">Go to Login</button>
        </div>
      </form>
    </>
  );
};

export default authLayout(NewPassword);
