import React from 'react';
import styles from "../../../assets/css/heading-header.module.css"

const HeadingHeader = ({ text }) => {
  return (
    <div className='row'>
      <div className="col-md-12">
        <h2 className={styles.headerHeading}>{text}</h2>
      </div>
    </div>
  )
}

export default HeadingHeader