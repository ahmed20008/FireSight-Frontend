import { useState } from "react";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import styles from "../assets/css/authenticated-layout.module.css";

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
              <div className={`card my-5 px-5 py-4 ${styles.authenticatedCard}`}>
                <WrappedComponent {...props} />
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
