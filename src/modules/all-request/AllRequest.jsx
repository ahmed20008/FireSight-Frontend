import React, {useEffect, useState} from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../shared/components/HeadingHeader";
import buttonStyles from "../../assets/css/buttons.module.css";
import styles from "../../assets/css/all-request.module.css";
import {globalImages} from "../../utils/staticImages";
import {allRequests} from "../../api/AllUsersApi";
import {toastrOnTopCenter} from "../../utils/toastr";

const AllRequest = () => {
  const [allUsersRequests, setAllUsersRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRequestedUsers();
  }, []);

  const fetchAllRequestedUsers = () => {
    allRequests()
      .then((response) => {
        setAllUsersRequests(response.users);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Users. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HeadingHeader text={"All Requests"} />
      <div className="d-flex flex-row justify-content-end">
        <button className={buttonStyles.buttonBlackRounded} style={{width: "200px"}}>
          Add New Member
        </button>
      </div>
      <div className={styles.allRequestContainer}>
        {allUsersRequests.map((requests, index) => (
          <div key={index} className={`${styles.requestCard} card mt-3`}>
            <div className={styles.userInfo}>
              <div className="row">
                <div className="col-md-2 text-center">
                  <img src={globalImages.avatar} className="img-fluid" alt="" />
                </div>
                <div className="col-md-6 my-auto">
                  <p>{requests.name}</p>
                  <p>{requests.email}</p>
                  <p>
                    {requests.address && (
                      <>
                        {requests.address.address}, {requests.address.city}, {requests.address.state} {requests.address.zipcode}
                      </>
                    )}
                  </p>
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
        ))}
      </div>
    </>
  );
};

export default authenticatedLayout(AllRequest);
