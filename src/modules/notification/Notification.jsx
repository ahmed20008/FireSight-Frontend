import React from 'react';
import authenticatedLayout from '../../layout/AuthenticatedLayout';
import HeadingHeader from '../shared/components/HeadingHeader';
import "../../assets/css/notification.css";

const Notification = () => {
  return (
    <>
      <HeadingHeader text={"Notifications"} />
      <div class="notification-ui_dd-content">
        <div class="notification-list notification-list--unread">
          <div class="notification-list_content">
            <div class="notification-list_detail">
              <p><b>Fire Detected</b></p>
              <p class="text-muted">Fire has been detected at Camera 1 located at lobby.</p>
              <p class="text-muted"><small>10 mins ago</small></p>
            </div>
          </div>
          <div class="notification-list_feature-img">
            <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
          </div>
        </div>
        <div class="notification-list notification-list--unread">
          <div class="notification-list_content">
            <div class="notification-list_detail">
              <p><b>Fire Detected</b></p>
              <p class="text-muted">Fire has been detected at Camera 1 located at lobby.</p>
              <p class="text-muted"><small>10 mins ago</small></p>
            </div>
          </div>
          <div class="notification-list_feature-img">
            <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
          </div>
        </div>
      </div>
    </>
  )
}

export default authenticatedLayout(Notification);