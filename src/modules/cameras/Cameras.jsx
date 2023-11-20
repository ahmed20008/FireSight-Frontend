import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';

const Cameras = () => {
  return (
    <>
      <HeadingHeader text={"Cameras"} />
    </>
  )
}

export default authenticatedLayout(Cameras);