import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from "../../modules/shared/components/HeadingHeader";

const AddCamera = () => {
  return (
    <>
      <HeadingHeader text={"Add Camera"} />
    </>
  )
}

export default authenticatedLayout(AddCamera);