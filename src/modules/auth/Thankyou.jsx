import styles from "../../assets/css/auth-pages.module.css";
import authLayout from "../../layout/AuthLayout";

const Thankyou = () => {
  return (
    <>
      <div className={styles.authContentHeading}>
        <h2>Thanks for submitting your application.</h2>
        <p>Our team is reviewing your application. We&#39;ll be in touch within 48 hours.</p>
        <br />
        <p>For urgent inquiries email: support@firesight.com</p>
      </div>
    </>
  );
};

export default authLayout(Thankyou);