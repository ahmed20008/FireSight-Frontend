import React from 'react';
import styles from "../../../assets/css/add-member-modal.module.css";
import animations from "../../../assets/css/animations.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import buttonStyles from "../../../assets/css/buttons.module.css";
import { addNewMember, updateMember } from '../../../api/AddMemberApi';
import { toastrOnTopCenter } from '../../../utils/toastr';

const AddMemberModal = ({ closeModal, selectedMember, allVerifiedUser }) => {
  const intialValue = {
    name: "",
    email: "",
    phone: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
    permissions: "",
    verified: "true",
    fire_dept_id: "",
  };
  const modalContainerRef = useRef(null);
  const modalElementRef = useRef(null);
  const [hideModal, setHideModal] = useState(true);
  const [addMember, setAddMember] = useState(intialValue);
  const [processing, setProcessing] = useState(false);
  const [fireDeptAddresses, setFireDeptAddresses] = useState(allVerifiedUser?.filter((user) => user?.permissions === "fire_dept"));

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "8px";

    if (selectedMember) {
      setAddMember((prev) => ({
        ...prev,
        name: selectedMember.name || "",
        phone: selectedMember.phone || "",
        email: selectedMember.email || "",
        address: {
          address: selectedMember.address?.address || "",
          city: selectedMember.address?.city || "",
          state: selectedMember.address?.state || "",
          zipcode: selectedMember.address?.zipcode || "",
        },
        permissions: selectedMember.permissions || "",
      }));
    }

    return () => {
      clearTimeout();
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedMember]);

  const handleModalClose = useCallback(() => {
    setHideModal(false);

    setTimeout(() => {
      closeModal();
    }, 200);
  }, [closeModal]);

  const handleClickOutsideModal = useCallback(
    (event) => {
      if (modalElementRef.current && !modalElementRef.current.contains(event.target)) {
        handleModalClose();
      }
    },
    [handleModalClose]
  );

  useEffect(() => {
    const modalContainer = modalContainerRef.current;
    if (modalContainer) {
      modalContainer.addEventListener("click", handleClickOutsideModal);
    }
    return () => {
      if (modalContainer) {
        modalContainer.removeEventListener("click", handleClickOutsideModal);
      }
    };
  }, [handleClickOutsideModal]);

  // Add Member API call
  const VerifyMember = (e) => {
    e.preventDefault();
    setProcessing(true);
    updateMember(selectedMember._id, addMember)
      .then((response) => {
        toastrOnTopCenter(response.message, "success");
        handleModalClose();
      })
      .catch((errors) => {
        toastrOnTopCenter(errors.message, "error");
      })
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <div ref={modalContainerRef} className={`modal ${!hideModal ? animations.fadeOut : animations.fadeIn}`} id="inviteTeamModal" tabIndex="-1" aria-labelledby="inviteTeamModalLabel" style={{ display: "block" }} aria-hidden="true">
        <div className={`modal-dialog modal-dialog-scrollable ${!hideModal ? animations.slideOut : animations.slideIn} ${styles.teamModal}`}>
          <form onSubmit={VerifyMember} ref={modalElementRef} className="modal-content">
            <div className={`modal-header border-0 pb-0 ${styles.teamModalHeader}`}>
              <h1 className="modal-title" id="inviteTeamModalLabel">
                Add a Member
              </h1>
              <hr className="hr" />
            </div>
            <div className={`modal-body pt-0 ${styles.modalBodyScroll}`}>
              <div className={styles.modalBodyContainer}>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="member-name" className="form-label px-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="member-name"
                    value={addMember.name}
                    onChange={(e) => setAddMember({ ...addMember, name: e.target.value })}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className={`mb-3 custom-phone-number-input addTeamField ${styles.modalField}`}>
                  <label htmlFor="member-email" className="form-label px-1">
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='member-email'
                    value={addMember.email}
                    onChange={(e) => setAddMember({ ...addMember, email: e.target.value })}
                    placeholder='Email'
                    required
                  />
                </div>
              </div>
              <div className={styles.modalBodyContainer}>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="member-address" className="form-label px-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="member-address"
                    value={addMember.address.address}
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        address: { ...addMember.address, address: e.target.value },
                      })
                    }
                    placeholder="Address"
                    required
                  />
                </div>
                <div className={`mb-3 custom-phone-number-input addTeamField ${styles.modalField}`}>
                  <label htmlFor="member-city" className="form-label px-1">
                    City
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='member-city'
                    value={addMember.address.city}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^a-zA-Z]/g, '');
                      setAddMember({ ...addMember, address: { ...addMember.address, city: sanitizedValue } })
                    }}
                    placeholder='City'
                    title="Please enter only alphabets"
                    required
                  />
                </div>
              </div>
              <div className={styles.modalBodyContainer}>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="member-state" className="form-label px-1">
                    State
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="member-state"
                    value={addMember.address.state}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^a-zA-Z]/g, '');
                      setAddMember({ ...addMember, address: { ...addMember.address, state: sanitizedValue } })
                    }}
                    placeholder="State"
                    title="Please enter only alphabets"
                    required
                  />
                </div>
                <div className={`mb-3 custom-phone-number-input addTeamField ${styles.modalField}`}>
                  <label htmlFor="team-phone-number" className="form-label px-1">
                    Zipcode
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="member-zipcode"
                    value={addMember.address.state}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                      setAddMember({ ...addMember, address: { ...addMember.address, zipcode: sanitizedValue } })
                    }}
                    placeholder="Zipcode"
                    maxLength={5}
                    required
                  />
                </div>
              </div>
              <div className={styles.modalBodyContainer}>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="member-phone" className="form-label px-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className={`form-control`}
                    id="member-phone"
                    value={addMember.phone}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                      setAddMember({ ...addMember, phone: sanitizedValue })
                    }}
                    placeholder="Phone (0000000000)"
                    title="Please enter only digits"
                    maxLength={12}
                    required
                  />
                </div>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="member-role" className="form-label px-1">
                    Role
                  </label>
                  <select
                    className='form-select'
                    value={addMember.permissions}
                    onChange={(e) => setAddMember({ ...addMember, permissions: e.target.value })}
                    id="member-role"
                    required
                  >
                    <option value="">Select Permission</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="fire_dept">Fire department</option>
                  </select>
                </div>
              </div>
              {!(addMember.permissions === "fire_dept") && (
                <div className={styles.modalBodyContainer}>
                  <div className={`mb-3 ${styles.modalField}`}>
                    <label htmlFor="team-role" className="form-label px-1">
                      Fire Dpt Address
                    </label>
                    <select
                      className='form-select'
                      value={addMember.fire_dept_id}
                      onChange={(e) => setAddMember({ ...addMember, fire_dept_id: e.target.value })}
                      id="fire-dept-address"
                      required
                    >
                      <option value="">Select Address</option>
                      {fireDeptAddresses.map((address, index) => (
                        <option key={index} value={address._id}>
                          {address.address.address}, {address.address.city}, {address.address.state} {address.address.zipcode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>)}
              <div className={` ${styles.modalFooterContainer}`}>
                <button disabled={processing ? true : false} type="button" onClick={handleModalClose} className={buttonStyles.buttonWhiteRounded}>
                  Cancel
                </button>
                <button disabled={processing ? true : false} type="submit" className={buttonStyles.buttonBlackRounded}>
                  {processing && <i className="fa fa-spinner fa-spin"></i>}
                  {!processing && "Add Member"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={`modal-backdrop fade show ${!hideModal ? animations.backdropFadeOut : ""}`}></div>
    </>
  )
}

export default AddMemberModal