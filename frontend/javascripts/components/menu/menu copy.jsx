import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Menu,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";
import InfoIcon from "@material-ui/icons/Info";
import TimelineIcon from "@material-ui/icons/Timeline";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import { Typography } from "@material-ui/core";
import style from "./style.scss";
import useStyles from "./mui-override";

export default function MainMenu() {
  const classes = useStyles();
  const history = useHistory();
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

  const infoText = () => {
    const path = history.location.pathname;
    let info;
    if (path === "/") {
      info = [
        "This map is showing a live stream of about 1% of all tweets worldwide!",
        "The tweets have been filtered to show only those that have their location publicly shared.",
        'Each tweet has been evaluated using a custom "sentiment analyzer" that supports 10+ languages and emojis!',
        "The colors shown on the map correspond to the sentiment score.",
      ];
    } else if (path === "/history") {
      info = [
        "This map is showing an hourly aggregate of roughly 1% of worldwide tweets over the past week!",
        "The tweets have been aggregated based on their location",
        "The size of each point corresponds to the number of tweets at that location, and the color represnts the average sentiment score",
      ];
    }

    return info.map((text, i) => (
      <ListItem key={`infoItem-${i}`}>
        <ListItemText disableTypography key={`infoText-${i}`}>
          {text}
        </ListItemText>
      </ListItem>
    ));
  };

  infoText();

  return (
    <div className={style.menuContainer}>
      <Button
        className={classes.menuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <AddCircleOutlinedIcon fontSize="large" />
      </Button>

      <Button
        className={classes.menuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleInfoClick}
      >
        <InfoIcon fontSize="large" />
      </Button>

      {/* <Menu
        className={style.menu}
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} className={style.menuItem}>
          <TwitterIcon className={style.icon} />
          <Link to="/">Live Tweet Map</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className={style.menuItem}>
          <TimelapseIcon className={style.icon} />

          <Link to="/history">7 Day Tweet History</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className={style.menuItem}>
          <TimelineIcon className={style.icon} />
          <Link to="/trending">Trending Topics</Link>
        </MenuItem>
      </Menu> */}

      <Button
        className={classes.menuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleInfoClick}
      >
        <InfoIcon fontSize="large" />
      </Button>

      {/* <Menu
        className={classes.infoMenu}
        id="simple-menu"
        anchorEl={infoAnchor}
        keepMounted
        open={Boolean(infoAnchor)}
        onClose={handleInfoClose}
      >
        <MenuItem>
        <Typography className={style.info} variant="body2"></Typography>
        <List onClick={handleInfoClose} className={classes.menuItem}>
          {infoText()}
        </List>
        </MenuItem>
      </Menu> */}
    </div>
  );
}
