import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";
import PublicIcon from "@material-ui/icons/Public";
import GitHubIcon from "@material-ui/icons/GitHub";
import InfoIcon from "@material-ui/icons/Info";
import TimelineIcon from "@material-ui/icons/Timeline";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import { Typography } from "@material-ui/core";
import style from "./style.scss";
import { useStyles, tooltipStyles } from "./mui-override";

export default function MainMenu() {
  const classes = useStyles();
  const tooltipClasses = tooltipStyles();
  const location = useLocation();
  const [menuAnchor, setMenuAnchorEl] = React.useState(null);
  const [infoAnchor, setInfoAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleInfoClick = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const liveText = () => {
    const info = [
      "This map is showing a live stream of about 1% of all tweets worldwide!",
      "The tweets have been filtered to show only those that have their location publicly shared.",
      "Each tweet has been evaluated using a custom 'sentiment analyzer' that supports 10+ languages and emojis! Each tweet's color corresponds to its sentiment score. (green: positive, red: negative, yellow: neutral)",
    ];

    return info.map((text, i) => (
      <ListItem key={`infoItem-${i}`}>
        <ListItemText disableTypography key={`infoText-${i}`}>
          {text}
        </ListItemText>
      </ListItem>
    ));
  };

  const historyText = () => {
    const info = [
      "This map is showing an hourly aggregate of roughly 1% of worldwide tweets over the past week!",
      "The tweets have been aggregated based on their location.",
      "The size of each point corresponds to the number of tweets at that location (as a percentage of all tweets at that hour).",
      "The average sentiment score is translated into a color from a gradient, ranging from green(positive) to red(negative)",
    ];

    return info.map((text, i) => (
      <ListItem key={`infoItem-${i}`}>
        <ListItemText disableTypography key={`infoText-${i}`}>
          {text}
        </ListItemText>
      </ListItem>
    ));
  };

  return (
    <div className={style.menuContainer}>
      <Link to="/">
        <Tooltip
          title={"Live Map"}
          arrow
          placement="left"
          classes={tooltipClasses}
        >
          <IconButton className={classes.menuButton}>
            <PublicIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <Link to="/history">
        <Tooltip
          title={"7 Day History Map"}
          arrow
          placement="left"
          classes={tooltipClasses}
        >
          <IconButton className={classes.menuButton}>
            <TimelapseIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <a href="#">
        <Tooltip
          title={location.pathname === "/history" ? historyText() : liveText()}
          arrow
          placement="left-start"
          classes={tooltipClasses}
        >
          <IconButton className={classes.menuButton}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </a>

      <a target="_blank" href="https://github.com/kiana-h/twitt-stream-er">
        <Tooltip
          title="Find Out More on Github!"
          arrow
          placement="left-start"
          classes={tooltipClasses}
        >
          <IconButton className={classes.menuButton}>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </a>
    </div>
  );
}
