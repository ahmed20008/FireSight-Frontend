import {useState} from "react";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import styles from "../assets/css/authenticated-layout.module.css?v1.0";

function authenticatedLayout(WrappedComponent) {
  return function AuthenticatedLayout(props) {
    const [sidebarPinned, setSidebarPinned] = useState(true);

    const updateSidebarState = () => {
      setSidebarPinned(!sidebarPinned);
    };

    return (
      <>
        <main className={sidebarPinned ? styles.layoutPinned : styles.layoutUnpinned}>
          <Sidebar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
          <div className={styles.mainContentContainer}>
            <Navbar sidebarPinned={sidebarPinned} updateSidebarState={updateSidebarState} />
            <Header />
            <div className={styles.mainContent}>
              <WrappedComponent {...props} />
            </div>
            <Footer />
          </div>
        </main>
      </>
    );
  };
}

export default authenticatedLayout;
