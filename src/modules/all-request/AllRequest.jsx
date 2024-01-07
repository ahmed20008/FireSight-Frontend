import React, { useEffect, useState } from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../shared/components/HeadingHeader";
import buttonStyles from "../../assets/css/buttons.module.css";
import styles from "../../assets/css/all-request.module.css";
import { globalImages } from "../../utils/staticImages";
import { allRequests, deleteUsers } from "../../api/AllUsersApi";
import { toastrOnTopCenter } from "../../utils/toastr";
import Swal from 'sweetalert2';
import Loader from "../../layout/partials/Loader";

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

  const handleDeleteRequest = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      deleteUsers(userId)
        .then((response) => {
          toastrOnTopCenter(response.message, "success");
          fetchAllRequestedUsers();
        })
        .catch((errors) => {
          toastrOnTopCenter("Error deleting user. Retry again later!", "error");
        });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <>
      <HeadingHeader text={"All Requests"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex flex-row justify-content-end">
            <button className={buttonStyles.buttonBlackRounded} style={{ width: "200px" }}>
              Add New Member
            </button>
          </div>
          <div className={styles.allRequestContainer}>
            {allUsersRequests?.length === 0 ? (
              <div className="alert alert-warning w-100" role="alert">
                There are not any requests to display in this page.
              </div>
            ) : (
              <>
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
                            <button className={buttonStyles.buttonBlackRounded} style={{ width: "150px" }}>
                              Add Member
                            </button>
                          </div>
                          <div>
                            <button className={buttonStyles.buttonBlackRounded} style={{ width: "150px", marginTop: "10px" }} onClick={() => handleDeleteRequest(requests._id)}>
                              Delete Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default authenticatedLayout(AllRequest);
