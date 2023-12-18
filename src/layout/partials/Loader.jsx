import styles from "../../assets/css/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.rumorLoader}></span>
    </div>
  );
};

export default Loader;
