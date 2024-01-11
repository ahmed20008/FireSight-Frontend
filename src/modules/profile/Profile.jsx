import React, { useState } from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import { globalImages } from "../../utils/staticImages";
import styles from "../../assets/css/profile.module.css";
// import buttonStyles from "../../assets/css/buttons.module.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/selectors";

const Profile = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  let capitalizedName = currentUser?.name?.charAt(0)?.toUpperCase() + currentUser?.name?.slice(1);
  const userAddress = currentUser?.address;
  const fireDeptAddress = currentUser?.fire_dept_address?.address;

  return (
    <>
      <HeadingHeader text={"Profile"} />
      <div className="d-flex justify-content-center">
        <div className={`card w-100 ${styles.profileCard}`}>
          <div className={styles.avatarImg}>
            <img src={globalImages.avatar} className="img-fluid" alt="avatar" />
          </div>
          <div className={styles.profileInfo}>
            <h2>{currentUser.verified === "true" ? "Verified" : "Unverified"}</h2>
            <h2>
              Name: <span>{capitalizedName}</span>
            </h2>
            <h2>
              Email: <span>{currentUser?.email ?? ""}</span>
            </h2>
            <h2>
              Phone no:
              <span> {currentUser?.phone}</span>
            </h2>
            <h2>
              Address:
              <span>{userAddress ? `${userAddress.address}, ${userAddress.city}, ${userAddress.state} ${userAddress.zipcode}` : "N/A"}</span>
            </h2>
            <h2>
              Fire Department Address:
              <span>{fireDeptAddress ? `${fireDeptAddress.address}, ${fireDeptAddress.city}, ${fireDeptAddress.state} ${fireDeptAddress.zipcode}` : "N/A"}</span>
            </h2>
            <h2>
              Role:
              <span> {currentUser?.permissions?.charAt(0)?.toUpperCase() + currentUser?.permissions?.slice(1)}</span>
            </h2>
          </div>
          {/* <button type="submit" className={`${buttonStyles.buttonBlackRounded} w-50 mt-4`}>
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Delete Account"}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default authenticatedLayout(Profile);
