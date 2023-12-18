import React from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../shared/components/HeadingHeader";
import buttonStyles from "../../assets/css/buttons.module.css";
import styles from "../../assets/css/all-request.module.css";
import {globalImages} from "../../utils/staticImages";

const AllRequest = () => {
  return (
    <>
      <HeadingHeader text={"All Requests"} />
      <div className="d-flex flex-row justify-content-end">
        <button className={buttonStyles.buttonBlackRounded} style={{width: "200px"}}>
          Add New Member
        </button>
      </div>
      <div className={styles.allRequestContainer}>
        <div className={`${styles.requestCard} card`}>
          <div className={styles.userInfo}>
            <div className="row">
              <div className="col-md-2 text-center">
                <img src={globalImages.avatar} className="img-fluid" alt="" />
              </div>
              <div className="col-md-6 my-auto">
                <p>Ali Ahmed</p>
                <p>test@gmail.com</p>
                <p>321 Johar Town, Lahore, Punjab</p>
              </div>
              <div className={`col-md-4 text-end ${styles.requestbutton}`}>
                <div>
                  <button className={buttonStyles.buttonBlackRounded} style={{width: "150px"}}>
                    Add Member
                  </button>
                </div>
                <div>
                  <button className={buttonStyles.buttonBlackRounded} style={{width: "150px", marginTop: "10px"}}>
                    Delete Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default authenticatedLayout(AllRequest);
