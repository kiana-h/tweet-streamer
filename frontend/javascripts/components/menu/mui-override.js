import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    backgroundColor: "black",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "rgba(210,210,210)",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "black",
      border: "1px solid black",
    },
  },
  infoMenu: {
    zIndex: "10000",
  },
  menuItem: {
    whiteSpace: "normal",
  },
}));

export const tooltipStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "black",
    fontSize: 15,
  },
  arrow: {
    // opacity: 1,
    color: "black",
  },
}));
