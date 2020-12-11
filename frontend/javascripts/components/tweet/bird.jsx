import io from "socket.io-client";
import style from "./style.scss";

export default class TweetBird {
  constructor(map) {
    this.map = map;
    this.socket = io({
      transports: ["websocket"],
    });
    this.maxMarkerCount = 2000;
    this.markers = [];
    this.incomingTweets = [];
    this.startListening();
  }

  startListening = () => {
    this.socket.on("tweet", (tweet) => {
      this.incomingTweets.push(tweet);
      while (this.incomingTweets.length) {
        this.addBird(this.incomingTweets.pop());
      }
    });
  };

  stopListening = () => {
    this.socket.removeAllListeners("tweet");
  };

  clear = () => {
    this.stopListening();
    this.markers.forEach((marker, i) => {
      marker.remove();
    });
    this.incomingTweets = queue.create(this.maxIncomingTweetLength);
    this.markers = [];
  };

  addBird(tweet) {
    if (isNaN(tweet.sentiment)) return;

    let dot = document.createElement("div");
    let id = `dot-${tweet.twitter_uid}`;
    dot.id = id;

    let className;
    if (tweet.sentiment > 0) {
      className = `${style["dot"]} ${style["positive"]}`;
    } else if (tweet.sentiment < 0) {
      className = `${style["dot"]} ${style["negative"]}`;
    } else if (tweet.sentiment === 0) {
      className = `${style["dot"]} ${style["neutral"]}`;
    }

    dot.className = className;

    const dotMarker = new mapboxgl.Marker(dot)
      .setLngLat(tweet.location.coordinates)
      .addTo(this.map);
    let popup;
    if (tweet.hashtag.length) {
      popup = new mapboxgl.Popup({
        offset: 5,
        closeButton: false,
      }).setText(`#${tweet.hashtag}`);

      dotMarker.setPopup(popup).togglePopup();
    }

    this.markers.push(dotMarker);

    setTimeout(() => {
      if (popup) {
        popup.remove();
      }
      const textPopup = new mapboxgl.Popup({
        offset: 5,
        closeButton: false,
      }).setText(`${tweet.text}`);

      dotMarker.setPopup(textPopup);
    }, 1000);

    this.checkMarkersLength();
  }

  checkMarkersLength = () => {
    const length = this.markers.length;
    if (length > this.maxMarkerCount) {
      const markersToDelete = length - this.maxMarkerCount;
      for (let i = 0; i < markersToDelete; i++) {
        this.markers[i].remove();
      }
      this.markers = this.markers.slice(-this.maxMarkerCount);
    }
  };
}
