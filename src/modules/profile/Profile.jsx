import React, {useState} from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import {globalImages} from "../../utils/staticImages";
import styles from "../../assets/css/profile.module.css";
import buttonStyles from "../../assets/css/buttons.module.css";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../redux/selectors";

const Profile = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  let capitalizedName = currentUser?.name?.charAt(0)?.toUpperCase() + currentUser?.name?.slice(1);
  const [processing, setProcessing] = useState(false);

  return (
    <>
      <HeadingHeader text={"Profile"} />
      <div className="d-flex justify-content-center">
        <div className={`card w-100 ${styles.profileCard}`}>
          <div className={styles.avatarImg}>
            <img src={globalImages.avatar} className="img-fluid" alt="avatar" />
          </div>
          <div className={styles.profileInfo}>
            <h2>{currentUser.verified === true ? "Verified" : "Unverified"}</h2>
            <h2>
              Name: <span>{capitalizedName}</span>
            </h2>
            <h2>
              Email: <span>{currentUser?.email ?? ""}</span>
            </h2>
            <h2>
              Role:
              <span> {currentUser?.permissions?.charAt(0)?.toUpperCase() + currentUser?.permissions?.slice(1)}</span>
            </h2>
          </div>
          <button type="submit" className={`${buttonStyles.buttonBlackRounded} w-50 mt-4`}>
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Delete Account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default authenticatedLayout(Profile);
