import React, { useState, useEffect } from "react";
import { Slider, Container, Typography, CssBaseline } from "@material-ui/core";
import style from "./style.scss";

const HistorySlider = ({ updateDateTime, marks }) => {
  const valueLabelFormat = (value) => {
    return formatDateTime(marks[value]);
  };

  const formatDateTime = (dateTime) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = dateTime.toLocaleDateString(undefined, options);
    const rawTime = dateTime.toLocaleTimeString();
    const time = rawTime.split(":")[0] + " " + rawTime.slice(-2);
    return `${date}-${time}`;
  };

  // const HistorySliderThumb = () => {
  //   return <div ref="historySliderThumb" className={style.thumb}></div>;
  // };

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
          defaultValue={0}
          // ThumbComponent={HistorySliderThumb}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          min={0}
          max={168}
          valueLabelFormat={valueLabelFormat}
          onChangeCommitted={handleChange}
          valueLabelDisplay="on"
        />
      </CssBaseline>
    </Container>
  );
};

export default HistorySlider;
