import { useState, useEffect } from "react";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import styles from "../assets/css/authenticated-layout.module.css";
import { me } from "../api/AuthApi";
import { useCookies } from "react-cookie";
import { updateCurrentUser } from "../redux/actionCreators";
import { useDispatch } from "react-redux";
import AlertPopup from "../modules/shared/components/AlertPopup";

function authenticatedLayout(WrappedComponent) {
  return function AuthenticatedLayout(props) {
    const dispatch = useDispatch();

    const [sidebarPinned, setSidebarPinned] = useState(true);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [cookies] = useCookies(["auth_token"]);
    const [token, setToken] = useState(cookies?.auth_token);

    useEffect(() => {
      refreshCurrenUserInfo();
    }, []);

    const updateSidebarState = () => {
      setSidebarPinned(!sidebarPinned);
    };

    const refreshCurrenUserInfo = () => {
      me(token)
        .then((response) => {
          const authUser = response.user;
          dispatch(updateCurrentUser(authUser));
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <>
        <main className={sidebarPinned ? styles.layoutPinned : styles.layoutUnpinned}>
          <Sidebar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
          <div className={styles.mainContentContainer}>
            <Navbar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
            <Header />
            <div className={styles.mainContent}>
              <div className={`card my-5 px-5 py-4 ${styles.authenticatedCard}`}>
                <button onClick={() => setShowAlertModal(true)}>Show</button>
                {showAlertModal && <AlertPopup closeModal={() => setShowAlertModal(false)} />}
                <WrappedComponent {...props} refreshCurrenUserInfo={refreshCurrenUserInfo} />
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </>
    );
  };
}

export default authenticatedLayout;
