import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "../../assets/css/header.module.css?v1.0";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathArray = pathname.split("/").filter(Boolean);
  let goBackLink;
  if (pathArray.length > 1) {
    goBackLink = pathArray[0];
  }

  return (
    <>
      {goBackLink && (
        <div className={styles.headerContainer}>
          <div>
            <Link to={`/${goBackLink}`} className={`d-flex flex-row align-items-center ${styles.headerGoBack}`}>
              <FontAwesomeIcon icon={faAngleLeft} />
              <p className="px-1 m-0">Go Back</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
