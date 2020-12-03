import React from "react";
import PropTypes from "prop-types";
import { Slider, Container, Typography, CssBaseline } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { sliderStyles, tooltipStyles } from "./mui-override";
import style from "./style.scss";

const HistorySlider = ({ updateDateTime, marks }) => {
  const sliderClasses = sliderStyles();
  const tooltipClasses = tooltipStyles();

  const valueLabelFormat = (value) => {
    return formatDateTime(marks[value]);
  };

  const formatDateTime = (dateTime) => {
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = dateTime.toLocaleDateString(undefined, options);
    const rawTime = dateTime.toLocaleTimeString();
    const time = rawTime.split(":")[0] + " " + rawTime.slice(-2);
    return `${date} - ${time}`;
  };

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;
    return (
      <Tooltip
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={value}
        arrow
        classes={tooltipClasses}
      >
        {children}
      </Tooltip>
    );
  };

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

  const handleChange = (event, newValue) => {
    updateDateTime(newValue);
  };
  return (
    <Container className={style.slider}>
      <CssBaseline>
        {/* <Typography id="discrete-slider-always" gutterBottom>
          History:
        </Typography> */}
        <Slider
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
          defaultValue={168}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          min={0}
          max={168}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          valueLabelDisplay="on"
          classes={sliderClasses}
        />
      </CssBaseline>
    </Container>
  );
};

export default HistorySlider;
