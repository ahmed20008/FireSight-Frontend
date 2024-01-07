import React, { useState } from "react";
import authLayout from "../../layout/AuthLayout";
import styles from "../../assets/css/auth-pages.module.css?v1.0";
import { toastrOnTopCenter } from "../../utils/toastr";
import { useNavigate, useParams } from "react-router-dom";
import { updatePassword } from "../../api/AuthApi";

const NewPassword = () => {
  const { id, resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const resetPassword = (event) => {
    event.preventDefault();
    setProcessing(true);

    if (password !== confirmPassword) {
      toastrOnTopCenter("The passwords you entered do not match. Please make sure both passwords are the same.", "error");
      setProcessing(false);
      return;
    }
    else {
      updatePassword(id, resetToken, { password })
        .then((response) => {
          toastrOnTopCenter(response.message, "success");
          navigate("/")
        })
        .catch((errors) => {
          toastrOnTopCenter(errors.message, "error");
        })
        .finally(() => {
          setProcessing(false);
        });
    }
  };

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
          <button type="submit">
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Go to Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default authLayout(NewPassword);
