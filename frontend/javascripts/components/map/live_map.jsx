import React from "react";
import mapboxgl from "mapbox-gl";
import style from "./style.scss";
import TweetBird from "../tweet/bird";
import keys from "../../../keys/keys";

mapboxgl.accessToken = keys.MAPBOX_TOKEN;

class TweetLiveMap extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/kioola/ckhjzhw0n2z3719lorxuwg2ua",
      center: [10, 15],
      zoom: 1.5,
      continuousWorld: false,
      noWrap: true,
      interactive: false,
    });
    this.map.on("load", () => {
      this.BirdManager = new TweetBird(this.map);
    });
  }
  componentWillUnmount() {
    this.BirdManager.clear();
    this.map.remove();
  }

  render() {
    return (
      <div>
        <div
          ref={(el) => (this.mapContainer = el)}
          className={style.mapContainer}
        />
      </div>
    );
  }
}

export default TweetLiveMap;
