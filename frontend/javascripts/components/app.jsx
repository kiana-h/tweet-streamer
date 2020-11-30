import React from "react";
import { Route, Switch } from "react-router-dom";
import TweetLiveMap from "./map/live_map";
import TweetHistoryMap from "./map/history_map";
import MainMenu from "./menu/menu";

const App = () => {
  return (
    <div>
      <header></header>
      <div className="app-container">
        <MainMenu />
        <Switch>
          <Route path="/history" component={TweetHistoryMap} />
          <Route path="/" component={TweetLiveMap} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
