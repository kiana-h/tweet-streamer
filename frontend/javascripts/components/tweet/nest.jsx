import React from "react";
import style from "./style.scss";

export default class BirdNest {
  constructor({ map, nests, toggleLoading }) {
    this.map = map;
    this.markers = [];
    this.nests = nests;
    this.avg_count = null;
    this.toggleLoading = toggleLoading;

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
    this.toggleLoading();
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
    dot.id = `nest-${i}`;

    let className;
    if (nest.sentimentScore > 0) {
      className = `${style["nest"]} ${style["positive"]}`;
    } else if (nest.sentimentScore < 0) {
      className = `${style["nest"]} ${style["negative"]}`;
    } else {
      className = `${style["nest"]} ${style["neutral"]}`;
    }

    dot.className = className;

    const dotMarker = new mapboxgl.Marker(dot)
      .setLngLat(nest.location.coordinates)
      .addTo(this.map);

    this.setSize(dot.id, nest.count);
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
}
