import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from "../../modules/shared/components/HeadingHeader";

const Profile = () => {
  return (
    <>
      <HeadingHeader text={"Profile"} />
    </>
  )
}

export default authenticatedLayout(Profile);