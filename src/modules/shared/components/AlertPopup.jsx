import React from 'react';
import styles from "../../../assets/css/add-member-modal.module.css";
import animations from "../../../assets/css/animations.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import buttonStyles from "../../../assets/css/buttons.module.css";
import { updateEvent } from '../../../api/NotificaionApi';
import { toastrOnTopCenter } from '../../../utils/toastr';


const AlertPopup = ({ closeModal, fireAlertData }) => {
  const [hideModal, setHideModal] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState();
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatTime = (time) => {
    const timeArray = time.split(':');
    let formattedTime = `${timeArray[0]}:${timeArray[1]}`;
    const hours = parseInt(timeArray[0]);
    if (hours >= 12) {
      formattedTime += ' PM';
    } else {
      formattedTime += ' AM';
    }
    return formattedTime;
  };

  const updateEventsCross = (_id) => {
    setProcessing(true);
    const payload = {
      event_check: {
        event_type: "old",
        status: "false"
      }
    };
    updateEvent(_id, payload)
      .then((response) => {
        toastrOnTopCenter(response.message, "success")
      })
      .catch((errors) => {
        toastrOnTopCenter("Error updating Event. Retry again later!", "error");
      })
      .finally(() => setProcessing(false))
  };

  return (
    <>
      <div ref={modalContainerRef} className={`modal ${!hideModal ? animations.fadeOut : animations.fadeIn}`} id="inviteTeamModal" tabIndex="-1" aria-labelledby="inviteTeamModalLabel" style={{ display: "block" }} aria-hidden="true">
        {fireAlertData.map((data, index) => (
          <>
            <div className={`modal-dialog modal-dialog-scrollable ${!hideModal ? animations.slideOut : animations.slideIn} ${styles.teamModal}`}>
              <form ref={modalElementRef} className="modal-content">
                <div key={index} className={`modal-header border-0 pb-0 ${styles.teamModalHeader}`}>
                  <h1 className="modal-title" id="inviteTeamModalLabel">
                    {capitalizeFirstLetter(data.event_data.class)} Detection Alert
                  </h1>
                  <hr className="hr" />
                </div>
                <div className={`modal-body pt-0 ${styles.modalBodyScroll}`}>
                  {capitalizeFirstLetter(data.event_data.class)} has been detected on {data.event_data.date} and {formatTime(data.event_data.time)}. <br />
                  Please take necessary action to avoid any potential threats. <br /> <a href="tel: +923061714544"> Call Emergency Department</a>
                  <div className="text-center pt-3">
                    <img src={data.event_pic} width="50%" height="50%" alt="" />
                  </div>
                </div>
                <div className={` ${styles.modalFooterContainer}`}>
                  <button
                    disabled={processing ? true : false}
                    type="button"
                    onClick={() => updateEventsCross(data._id)}
                    className={buttonStyles.buttonWhiteRounded}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                  <button disabled={processing ? true : false} type="submit" className={buttonStyles.buttonBlackRounded}>
                    {processing && <i className="fa fa-spinner fa-spin"></i>}
                    {!processing && <i className="fa fa-check" aria-hidden="true"></i>}
                  </button>
                </div>
              </form>
            </div>
          </>
        ))}
      </div>
      <div className={`modal-backdrop fade show ${!hideModal ? animations.backdropFadeOut : ""}`}></div>
    </>
  )
}

export default AlertPopup