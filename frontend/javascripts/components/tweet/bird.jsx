import React from "react";
import io from "socket.io-client";
import queue from "fixed-size-queue";
import style from "./style.scss";

export default class TweetBird {
  constructor(map) {
    this.map = map;
    this.socket = io({
      transports: ["websocket"],
    });
    this.maxMarkerLength = 2000;
    this.maxIncomingTweetLength = 50;
    this.markers = [];
    this.incomingTweets = queue.create(this.maxIncomingTweetLength);
    this.startListening();
  }

  startListening = () => {
    this.socket.on("tweet", (tweet) => {
      this.incomingTweets.enqueue(tweet);
      while (this.incomingTweets.getCount()) {
        let tweetToRender = this.incomingTweets.dequeue();
        this.addBird(tweetToRender);
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
    this.incomingTweets = queue.create(100);
    this.markers = [];
  };

  addBird(tweet) {
    let dot = document.createElement("div");
    dot.id = `dot-${tweet.twitter_uid}`;

    let className;
    if (tweet.sentiment > 0) {
      className = `${style["dot"]} ${style["positive"]}`;
    } else if (tweet.sentiment < 0) {
      className = `${style["dot"]} ${style["negative"]}`;
    } else if (tweet.sentiment === 0) {
      className = `${style["dot"]} ${style["neutral"]}`;
    } else {
      className = `${style["dot"]} ${style["notAvailable"]}`;
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
        // closeOnClick: false,
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
    if (length > this.maxMarkerLength) {
      const markersToDelete = length - this.maxMarkerLength;
      for (let i = 0; i < markersToDelete; i++) {
        this.markers[i].remove();
      }
      this.markers = this.markers.slice(-this.maxMarkerLength);
    }
  };
}
