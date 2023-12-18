import React from "react";
import styles from "../../../assets/css/page-loader.module.css";

const PageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.rumorLoader}></span>
    </div>
  );
};

export default PageLoader;
