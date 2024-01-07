import React, { useState, useEffect } from "react";
import authenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../shared/components/HeadingHeader";
import { IconTrash } from "@tabler/icons-react";
import styles from "../../assets/css/all-users.module.css";
import { allUsers, deleteUsers } from "../../api/AllUsersApi";
import { toastrOnTopCenter } from "../../utils/toastr";
import { globalImages } from "../../utils/staticImages";
import Loader from "../../layout/partials/Loader";
import Swal from 'sweetalert2';

const AllUsers = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    allUsers()
      .then((response) => {
        setAllUsersData(response.users);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Users. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsersData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = (userId) => {
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
          fetchAllUsers();
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
  };

  return (
    <>
      <HeadingHeader text={"All Users"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.teamTableContainer}>
            <div className={styles.teamTable}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
                      <td>
                        <img className={styles.userImg} src={globalImages.avatar} alt="avatar" />
                        {user?.name ?? ""}
                      </td>
                      <td>{user?.email ?? ""}</td>
                      <td>{user?.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.zipcode}` : "N/A"}</td>
                      <td>
                        <button onClick={() => handleDeleteUser(user._id)} className="border-0 bg-transparent">
                          <IconTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {currentUsers?.length === 0 && <div className={styles.emptyGuestlist}>There are not any users to display.</div>}

            </div>
          </div>
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(allUsersData.length / usersPerPage) }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(index + 1)} className={`page-link ${styles.paginationButton}`}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default authenticatedLayout(AllUsers);
