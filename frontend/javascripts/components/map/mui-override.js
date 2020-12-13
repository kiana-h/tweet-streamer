import { makeStyles } from "@material-ui/core/styles";

export const sliderStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  rail: {
    opacity: 1,
  },
}));
export const tooltipStyles = makeStyles((theme) => ({
  tooltip: {
    opacity: 1,
    backgroundColor: "black",
    fontSize: 15,
  },
  arrow: {
    opacity: 1,
    color: "black",
  },
}));
