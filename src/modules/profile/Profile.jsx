import React, { useState } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from "../../modules/shared/components/HeadingHeader";
import { globalImages } from '../../utils/staticImages';
import styles from "../../assets/css/profile.module.css";
import buttonStyles from "../../assets/css/buttons.module.css";
import { useSelector } from "react-redux";
import { getCurrentUser } from '../../redux/actionCreators';

const Profile = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  console.log(currentUser);
  const [processing, setProcessing] = useState(false);

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
          <button type="submit" className={`${buttonStyles.buttonBlackRounded} w-50 mt-4`}>
            {processing && <i className="fa fa-spinner fa-spin"></i>}
            {!processing && "Delete Account"}
          </button>
        </div>
      </div>
    </>
  )
}

export default authenticatedLayout(Profile);