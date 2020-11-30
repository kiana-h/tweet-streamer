// import "./socket.js";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import styles from "../stylesheets/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
