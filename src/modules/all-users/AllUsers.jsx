import React, { useState, useEffect } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';
import { IconTrash } from '@tabler/icons-react';
import styles from "../../assets/css/all-users.module.css";
import { allUsers, deleteUsers } from '../../api/AllUsersApi';
import { toastrOnTopCenter } from '../../utils/toastr';
import { globalImages } from '../../utils/staticImages';

const AllUsers = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

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
      });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsersData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = (userId) => {
    deleteUsers(userId)
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
        fetchAllUsers();
      })
      .catch((errors) => {
        toastrOnTopCenter("Error deleting user. Retry again later!", "error");
      });
  };

  return (
    <>
      <HeadingHeader text={"All Users"} />
      <div className={styles.allUserTable}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Permissions</th>
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
                <td>
                  {user?.permissions?.map(permission => (
                    <span key={permission}>
                      {permission?.charAt(0)?.toUpperCase() + permission?.slice(1)}
                      {" "}
                    </span>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className='border-0 bg-transparent'>
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(allUsersData.length / usersPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className={`page-link ${styles.paginationButton}`}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default authenticatedLayout(AllUsers);