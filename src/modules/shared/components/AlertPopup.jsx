import React from 'react';
import styles from "../../../assets/css/add-member-modal.module.css";
import animations from "../../../assets/css/animations.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import buttonStyles from "../../../assets/css/buttons.module.css";


const AlertPopup = ({ closeModal }) => {
  const [hideModal, setHideModal] = useState(true);
  const modalContainerRef = useRef(null);
  const modalElementRef = useRef(null);

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
                Fire Detected
              </h1>
              <hr className="hr" />
            </div>
            <div className={`modal-body pt-0 ${styles.modalBodyScroll}`}>
              Fire has been detected
            </div>
          </form>
        </div>
      </div>
      <div className={`modal-backdrop fade show ${!hideModal ? animations.backdropFadeOut : ""}`}></div>
    </>
  )
}

export default AlertPopup