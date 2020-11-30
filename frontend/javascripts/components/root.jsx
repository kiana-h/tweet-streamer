import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Theme from "./theme/theme";
// import { ThemeProvider } from "@material-ui/core/styles";
import App from "./app";

const Root = () => (
  //   <Provider store={store}>
  <BrowserRouter>
    {/* <ThemeProvider theme={Theme}> */}
    <App />
    {/* </ThemeProvider> */}
  </BrowserRouter>
  //   </Provider>
);

export default Root;
