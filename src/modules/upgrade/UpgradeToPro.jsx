import React from 'react'
import authenticatedLayout from '../../layout/AuthenticatedLayout'
import HeadingHeader from '../shared/components/HeadingHeader';

const UpgradeToPro = () => {
  return (
    <>
      <HeadingHeader text={"Upgrade to Pro"} />
    </>
  )
}

export default authenticatedLayout(UpgradeToPro);