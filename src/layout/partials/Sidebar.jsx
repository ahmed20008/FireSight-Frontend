import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconUsers, IconUserCircle, IconLayoutDashboard, IconShoppingBag, IconDeviceCctv, IconCirclePlus, IconLogout } from '@tabler/icons-react';
import { authImages } from "../../utils/staticImages";
import styles from "../../assets/css/sidebar.module.css?v1.0";

const Sidebar = ({ sidebarPinned, updateSidebarState }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const pathArray = currentRoute.split("/").filter(Boolean);

  const [sidebarShow, setSidebarShow] = useState(false);
  const handleSidebarHover = (e) => {
    if (!sidebarPinned) {
      setSidebarShow(true);
    }
  };

  const handleSidebarHoverLeave = (e) => {
    if (!sidebarPinned) {
      setSidebarShow(false);
    }
  };

  return (
    <div className={`${styles.sidebarContent} ${sidebarPinned ? styles.sidebarContentPinned : styles.sidebarContentUnpinned}`} onClick={() => updateSidebarState()}>
      <div
        className={`${styles.sidebarContainer} ${styles.sidebarScrollBar} ${sidebarPinned || sidebarShow ? styles.pinContainer : styles.unpinContainer}`}
        onMouseEnter={handleSidebarHover}
        onMouseLeave={handleSidebarHoverLeave}
        onClick={(e) => e.stopPropagation()}
      >
        <nav>
          <ul className={styles.listContainer}>
            <li className={styles.listItemLogo}>
              <Link to="/dashboard">
                <div className={sidebarPinned || sidebarShow ? "" : styles.hideSidebarImage}>
                  <img width={170} src={authImages.logo} alt="dashboardIcon" />
                </div>
              </Link>
            </li>
            {sidebarPinned && <p className="py-2 mb-0 text-white">HOME</p>}
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "dashboard" ? styles.sidebarActive : ""}`}>
              <Link to="/dashboard">
                <div>
                  <IconLayoutDashboard />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>Dashboard</span>
              </Link>
            </li>
            {sidebarPinned && <p className="py-2 mb-0 text-white">CAMERA INFO</p>}
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "cameras" ? styles.sidebarActive : ""}`}>
              <Link to="/cameras">
                <div>
                  <IconDeviceCctv />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>All Cameras</span>
              </Link>
            </li>
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "my-cameras" ? styles.sidebarActive : ""}`}>
              <Link to="/my-cameras">
                <div>
                  <IconDeviceCctv />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>My Cameras</span>
              </Link>
            </li>
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "add-camera" ? styles.sidebarActive : ""}`}>
              <Link to="/add-camera">
                <div>
                  <IconCirclePlus />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>Add Camera</span>
              </Link>
            </li>
            {sidebarPinned && <p className="py-2 mb-0 text-white">PROFILE</p>}
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "profile" ? styles.sidebarActive : ""}`}>
              <Link to="/profile">
                <div>
                  <IconUserCircle />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>Profile</span>
              </Link>
            </li>
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "all-users" ? styles.sidebarActive : ""}`}>
              <Link to="/all-users">
                <div>
                  <IconUsers />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>All Users</span>
              </Link>
            </li>
            {sidebarPinned && <p className="py-2 mb-0 text-white">UPGRADE</p>}
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "upgrade-to-pro" ? styles.sidebarActive : ""}`}>
              <Link to="/upgrade-to-pro">
                <div>
                  <IconShoppingBag />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>Upgrade to Pro</span>
              </Link>
            </li>
            {sidebarPinned && <p className="py-2 mb-0 text-white">OTHERS</p>}
            <li className={`mb-1 ${styles.listItem} ${pathArray[0] === "logout" ? styles.sidebarActive : ""}`}>
              <Link to="#">
                <div>
                  <IconLogout />
                </div>
                <span className={sidebarPinned || sidebarShow ? styles.showSidebarSpan : styles.hideSidebarSpan}>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
