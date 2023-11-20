import React from "react";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import HeadingHeader from "../../modules/shared/components/HeadingHeader"
import styles from "../../assets/css/dashboard.module.css?v1.0";

const Dashboard = () => {

  return (
    <>
      <HeadingHeader text={"Dashboard"} />
    </>
  );
};

export default AuthenticatedLayout(Dashboard);
