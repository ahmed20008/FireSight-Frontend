import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import authenticatedLayout from '../../layout/AuthenticatedLayout';

class CameraStream extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const videoNode = this.videoRef.current;
    const player = videojs(videoNode);

    player.src({ src: 'http://127.0.0.1:5001/video_feed' });

    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = () => {
    const videoNode = this.videoRef.current;
    const player = videojs(videoNode);

    player.play();

    document.removeEventListener('click', this.handleDocumentClick);
  };

  render() {
    return (
      <div>
        <video
          ref={this.videoRef}
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          width="640"
          height="360"
        />
      </div>
    );
  }
}

export default authenticatedLayout(CameraStream);
