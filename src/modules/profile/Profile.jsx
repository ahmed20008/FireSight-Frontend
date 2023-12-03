import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import { globalImages } from '../../utils/staticImages';
import styles from "../../assets/css/profile.module.css";

const Profile = () => {
  return (
    <>
      <HeadingHeader text={"Profile"} />
      <div className="d-flex justify-content-center">
        <div className={`card w-100 ${styles.profileCard}`}>
          <div className={styles.avatarImg}>
            <img src={globalImages.avatar} className='img-fluid' alt="avatar" />
          </div>
          <div className={styles.profileInfo}>
            <h2>
              Name: <span>John Doe</span>
            </h2>
            <h2>
              Email: <span>test@gmail.com</span>
            </h2>
            <h2>
              Role: <span>User</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default authenticatedLayout(Profile);