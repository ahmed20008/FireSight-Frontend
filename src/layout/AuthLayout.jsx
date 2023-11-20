import React from "react";
import {authImages} from "../utils/staticImages";
import styles from "../assets/css/auth-layout.module.css?v1.0";
import {Link} from "react-router-dom";

function authLayout(WrappedComponent) {
  return function AuthLayout(props) {
    return (
      <main className={styles.authContainer}>
        <div className={styles.authContentContainer}>
          <div>
            <Link href="/">
              <img className={styles.authContentIcon} src={authImages.logo} alt="logo" />
            </Link>
            <div className={styles.authChildren}>
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
        <img className={styles.authImg} src={authImages.authSideImg} alt="landing" />
      </main>
    );
  };
}
export default authLayout;
