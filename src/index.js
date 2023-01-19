/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// Implementing Redux With Thunk
import { Provider } from "react-redux";
import store from "./redux/store";
// import { fetchUsers, getAllJobs, fetchTradie } from "./redux/actions/action";
// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

// setTimeout(() => {
//   store.dispatch(fetchUsers());
//   store.dispatch(fetchTradie());
//   store.dispatch(getAllJobs());
// }, 2000);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
