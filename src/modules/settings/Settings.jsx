import React from 'react'
import HeadingHeader from '../shared/components/HeadingHeader'
import authenticatedLayout from '../../layout/AuthenticatedLayout';

const Settings = () => {
  return (
    <>
      <HeadingHeader text={"Settings"} />
    </>
  )
}

export default authenticatedLayout(Settings);