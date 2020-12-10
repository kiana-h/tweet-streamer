import React from "react";
import mapboxgl from "mapbox-gl";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import * as ApiUtil from "../../util/tweet_api_util";
import Nest from "../tweet/nest";
import HistorySlider from "./history_slider";
import style from "./style.scss";
import keys from "../../../keys/keys";

mapboxgl.accessToken = keys.MAPBOX_TOKEN;

class TweetHistoryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dateTime: null,
      marks: {},
      nests: [],
    };
  }

  getMarks = () => {
    const dateMarks = {};
    let currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours());
    currentDateTime.setMinutes(0, 0, 0);
    for (let i = 168; i >= 0; i--) {
      dateMarks[i] = currentDateTime;
      let oneHourBefore = new Date(currentDateTime);
      oneHourBefore.setHours(oneHourBefore.getHours() - 1);
      currentDateTime = oneHourBefore;
    }
    this.setState({ marks: dateMarks });
  };

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
      this.getMarks();
      // this.toggleLoading();
      this.getTweets(this.state.marks[168].toISOString());
    });
  }

  getTweets = async (dateTime) => {
    const tweets = await ApiUtil.getTweetsByDateTime(dateTime);
    if (this.nestManager) {
      this.nestManager.clear();
      this.nestManager.setNests(tweets);
    } else {
      this.nestManager = new Nest({
        map: this.map,
        nests: tweets,
        // toggleLoading: this.toggleLoading,
      });
    }
  };

  // toggleLoading = () => {
  //   const loading = this.state.loading;
  //   this.setState({ loading: !loading });
  // };

  componentWillUnmount() {
    this.nestManager.clear();
    this.map.remove();
  }

  updateDateTime = (newValue) => {
    const dateTime = this.state.marks[newValue].toISOString();
    // this.toggleLoading();
    this.setState({ dateTime });
    this.getTweets(dateTime);
  };

  render() {
    return (
      <div>
        {this.state.loading && (
          <Loader
            className={style.spinner}
            type="Circles"
            color="rgba(80,80,80,.5)"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        <div
          ref={(el) => (this.mapContainer = el)}
          className={style.mapContainer}
        />
        {this.state.marks[0] && (
          <HistorySlider
            updateDateTime={this.updateDateTime}
            marks={this.state.marks}
          />
        )}
      </div>
    );
  }
}

export default TweetHistoryMap;
