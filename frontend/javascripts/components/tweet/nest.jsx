import React from "react";
import style from "./style.scss";
import SentimentColorPicker from "../../util/sentiment_color_picker";

export default class BirdNest {
  constructor({ map, nests }) {
    this.map = map;
    this.markers = [];
    this.nests = nests;
    this.avg_count = null;
    this.sentimentColorPicker = new SentimentColorPicker({ live: false });
    // this.toggleLoading = toggleLoading;

    this.setNests(nests);
  }

  getAvgCount = () => {
    let nestCount = 0;
    for (let nest of this.nests) {
      nestCount += parseInt(nest.count);
    }
    this.avg_count = nestCount / this.nests.length;
  };

  addNestMarkers = () => {
    for (let i = 0; i < this.nests.length; i++) {
      this.addNest(this.nests[i], i);
    }
    // this.toggleLoading();
  };

  setNests = (nests) => {
    this.nests = nests;
    this.getAvgCount();
    this.addNestMarkers();
  };

  clear = () => {
    this.markers.forEach((marker, i) => {
      marker.remove();
      delete this.markers[i];
    });
    this.nests = [];
    this.markers = [];
    this.avg_count = null;
  };

  addNest(nest, i) {
    let dot = document.createElement("div");
    const id = `nest-${i}`;
    dot.id = id;

    dot.className = style["dot"];

    const dotMarker = new mapboxgl.Marker(dot)
      .setLngLat(nest.location.coordinates)
      .addTo(this.map);

    this.setSize(dot.id, nest.count);
    this.setColor(dot.id, nest.sentimentScore);

    this.markers.push(dotMarker);

    const markerInfo = `Count: ${nest.count} , Sentiment Score: ${
      typeof parseFloat(nest.sentimentScore) === "number"
        ? parseFloat(nest.sentimentScore).toFixed(2)
        : 0.0
    }`;

    const textPopup = new mapboxgl.Popup({
      offset: 5,
      closeButton: false,
    }).setText(`${markerInfo}`);

    dotMarker.setPopup(textPopup);
  }

  setSize(id, count) {
    const weight =
      (parseInt((count / this.avg_count).toFixed()) + 5).toString() + "px";
    document.getElementById(id).style.width = weight;
    document.getElementById(id).style.height = weight;
  }

  setColor(id, sentiment) {
    const color = this.sentimentColorPicker.getColor(sentiment);
    document.getElementById(id).style.backgroundColor = color;
    document.getElementById(id).style.opacity = 0.75;
  }
}
