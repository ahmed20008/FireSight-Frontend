import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';


const AllUsers = () => {
  return (
    <>
      <HeadingHeader text={"All Users"} />
    </>
  )
}

export default authenticatedLayout(AllUsers);