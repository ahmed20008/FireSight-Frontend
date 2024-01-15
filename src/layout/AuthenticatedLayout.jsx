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
import { getCurrentUser } from "../redux/selectors";
import { useSelector } from "react-redux";
import { getEvent } from "../api/NotificaionApi";
import { toastrOnTopCenter } from "../utils/toastr";
import AlertPopup from "../modules/shared/components/AlertPopup";
import alarm from "../assets/alarm/alarm.mp3";

function authenticatedLayout(WrappedComponent) {
  return function AuthenticatedLayout(props) {
    const currentUser = useSelector((state) => getCurrentUser(state));
    const dispatch = useDispatch();

    const [fireAlertData, setFireAlertData] = useState(true);
    const [sidebarPinned, setSidebarPinned] = useState(true);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [cookies] = useCookies(["auth_token"]);
    const [token, setToken] = useState(cookies?.auth_token);

    useEffect(() => {
      refreshCurrenUserInfo();
    }, []);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (currentUser && currentUser._id) {
          fetchEvent(currentUser._id);
        }
      }, 15000);

      return () => clearInterval(intervalId);
    }, [currentUser]);

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

    const fetchEvent = (_id) => {
      getEvent(_id)
        .then((response) => {
          const newEvents = response.events.filter((event) => event.event_check.event_type === "new");
          setFireAlertData(newEvents);
          if (newEvents.length > 0) {
            setShowAlertModal(true);
            // playAlarmSound();
          }
        })
        .catch((errors) => {
          toastrOnTopCenter("Error Fetching Event. Retry again later!", "error");
        })
    };

    // const playAlarmSound = () => {
    //   const alarmAudio = new Audio(alarm);
    //   alarmAudio.play();
    // };

    return (
      <>
        <main className={sidebarPinned ? styles.layoutPinned : styles.layoutUnpinned}>
          <Sidebar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
          <div className={styles.mainContentContainer}>
            <Navbar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
            <Header />
            <div className={styles.mainContent}>
              <div className={`card my-5 px-5 py-4 ${styles.authenticatedCard}`}>
                {showAlertModal && <AlertPopup fireAlertData={fireAlertData} closeModal={() => setShowAlertModal(false)} />}
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
