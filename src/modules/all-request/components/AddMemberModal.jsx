import React from 'react';
import styles from "../../../assets/css/add-member-modal.module.css";
import animations from "../../../assets/css/animations.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import buttonStyles from "../../../assets/css/buttons.module.css";

const AddMemberModal = ({ closeModal, selectedMember }) => {
  const intialValue = {
    name: "",
    phone: "",
    email: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };
  const modalContainerRef = useRef(null);
  const modalElementRef = useRef(null);
  const [hideModal, setHideModal] = useState(true);
  const [addMember, setAddMember] = useState(intialValue);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "8px";

    return () => {
      clearTimeout();
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

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


  return (
    <>
      <div ref={modalContainerRef} className={`modal ${!hideModal ? animations.fadeOut : animations.fadeIn}`} id="inviteTeamModal" tabIndex="-1" aria-labelledby="inviteTeamModalLabel" style={{ display: "block" }} aria-hidden="true">
        <div className={`modal-dialog modal-dialog-scrollable ${!hideModal ? animations.slideOut : animations.slideIn} ${styles.teamModal}`}>
          <form ref={modalElementRef} className="modal-content">
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
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        address: { ...addMember.address, city: e.target.value },
                      })
                    }
                    placeholder='City'
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
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        address: { ...addMember.address, state: e.target.value },
                      })
                    }
                    placeholder="State"
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
                    onChange={(e) =>
                      setAddMember({
                        ...addMember,
                        address: { ...addMember.address, zipcode: e.target.value },
                      })
                    }
                    placeholder="Zipcode"
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
                    onChange={(e) => setAddMember({ ...addMember, phone: e.target.value })}
                    placeholder="Phone"
                  />
                </div>
                <div className={`mb-3 ${styles.modalField}`}>
                  <label htmlFor="team-role" className="form-label px-1">
                    Fire Dpt Address
                  </label>
                  <select name="" id="">
                    <option value="1">1</option>
                    <option value="1">1</option>
                    <option value="1">1</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </div>
              <div className={` ${styles.modalFooterContainer}`}>
                <button disabled={processing ? true : false} type="button" onClick={handleModalClose} className={buttonStyles.buttonWhiteRounded}>
                  Cancel
                </button>
                <button disabled={processing ? true : false} type="submit" className={buttonStyles.buttonBlackRounded}>
                  Add Member
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