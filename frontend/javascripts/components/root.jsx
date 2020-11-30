import React from "react";
import { HashRouter } from "react-router-dom";
// import Theme from "./theme/theme";
// import { ThemeProvider } from "@material-ui/core/styles";
import App from "./app";

const Root = () => (
  //   <Provider store={store}>
  <HashRouter>
    {/* <ThemeProvider theme={Theme}> */}
    <App />
    {/* </ThemeProvider> */}
  </HashRouter>
  //   </Provider>
);

export default Root;
