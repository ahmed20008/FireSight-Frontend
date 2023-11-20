import {Link} from "react-router-dom";
import styles from "../../assets/css/header.module.css?v1.0";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>© 2023 Fire Sight, Inc. All Rights Reserved.</p>
      <div>
        <Link to="">Terms of Service</Link>
        <Link to="">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
