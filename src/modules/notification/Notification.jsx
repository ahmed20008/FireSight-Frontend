import React, { useEffect, useState } from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';
import "../../assets/css/notification.css";
import { toastrOnTopCenter } from '../../utils/toastr';
import { allEvents } from '../../api/NotificaionApi';

const Notification = () => {

  const [allEvent, setAllEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = () => {
    allEvents()
      .then((response) => {
        setAllEvent(response.events);
      })
      .catch((errors) => {
        toastrOnTopCenter("Error Fetching Cameras. Retry again later!", "error");
      })
      .finally(() => setLoading(false));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

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

  return (
    <>
      <HeadingHeader text={"Notifications"} />
      <div className="notification-ui_dd-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          allEvent.map((notification, index) => (
            <div key={index} className="notification-list notification-list--unread">
              <div className="notification-list_content">
                <div className="notification-list_detail">
                  <p><b>{notification.event_data.class} detected</b></p>
                  <p className="text-muted">{notification.event_data.class} detected on {notification.event_data.date} and {formatTime(notification.event_data.time)}</p>
                  <p className="text-muted"><small>{formatTimestamp(notification.createdAt)}</small></p>
                </div>
              </div>
              <div className="notification-list_feature-img">
                <img src={notification.event_pic} alt="Fire Image" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default authenticatedLayout(Notification);
