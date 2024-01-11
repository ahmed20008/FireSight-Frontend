import React, { useState, useEffect } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';
import styles from "../../assets/css/support.module.css";
import buttonStyles from "../../assets/css/buttons.module.css"
import { sendSupport, supportData } from '../../api/support';
import { toastrOnTopCenter } from '../../utils/toastr';
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/selectors";
import { ADMIN, USER } from '../../utils/rolesConstants';

const Support = () => {
  const currentUser = useSelector((state) => getCurrentUser(state));
  const initialData = {
    user_id: currentUser._id,
    category: '',
    subject: '',
    message: '',
  }
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [supportMessages, setSupportMessages] = useState();

  useEffect(() => {
    supportMessage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    sendSupport({ ...formData })
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
        setFormData(initialData);
      })
      .catch((errors) => {
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const supportMessage = () => {
    supportData()
      .then((response) => {
        setSupportMessages(response.support);
      })
      .catch((errors) => {
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <>
      <HeadingHeader text={"Support"} />
      {(currentUser?.permissions === USER) && (
        <div className="row">
          <div className="col-md-12">
            <div className={styles.addCamera}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="category">Category:</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="subject">Subject:</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    required
                    className="form-control"
                    id="message"
                    placeholder="Enter Description"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <div className="text-start">
                  <button type="submit" className={`${buttonStyles.buttonBlackRounded} w-25`}>
                    {processing && <i className="fa fa-spinner fa-spin"></i>}
                    {!processing && "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {(currentUser?.permissions === ADMIN) && (
        <>
          <h6 className='my-3'>All Support Messages</h6>
          {supportMessages && supportMessages.map((message) => (
            <div className={`card mb-3 px-3 pt-1 pb-1 ${styles.supportMessages}`}>
              <h2>Category: <span>{message.category}</span></h2>
              <h2>Subject: <span>{message.subject}</span></h2>
              <h2>Message: <span>{message.message}</span></h2>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default authenticatedLayout(Support);
