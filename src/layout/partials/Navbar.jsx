import {Link} from "react-router-dom";
import styles from "../../assets/css/navbar.module.css?v1.0";

const Navbar = ({sidebarPinned, updateSidebarState}) => {

  return (
    <div className={styles.header}>
      <button className={styles.sidenavToggler} onClick={updateSidebarState}>
        <div className={styles.sidenavTogglerInner}>
          <i className={`${styles.sidenavTogglerLine} ${sidebarPinned ? styles.sidenavIconPinned : ""}`}></i>
          <i className={styles.sidenavTogglerLine}></i>
          <i className={`${styles.sidenavTogglerLine} ${sidebarPinned ? styles.sidenavIconPinned : ""}`}></i>
        </div>
      </button>
      <div className={styles.searchbarContainer}>
      </div>
      <span className={styles.navbarName}>John Doe</span>
      <div className="dropdown">
        <img src="#" className={`rounded-circle ${styles.navbarAvatar}`} alt="Avatar" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" href="/settings">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/settings">
              Settings
            </Link>
          </li>
          {/* <li>
            <Link className="dropdown-item" href="#">
              Payment
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
