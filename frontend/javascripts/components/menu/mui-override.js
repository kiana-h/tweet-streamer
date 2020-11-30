import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "#4052b5",
    },
  },
  infoMenu: {
    zIndex: "10000",
  },
  menuItem: {
    whiteSpace: "normal",
  },
}));

export default useStyles;
