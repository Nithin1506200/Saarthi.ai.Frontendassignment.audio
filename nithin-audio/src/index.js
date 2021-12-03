import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./controlstyle.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/HeaderComponent.jsx";
import Audioplayer from "./handleupload.js";
import Newwav from "./newhandleupload.js";

ReactDOM.render(
  <React.Fragment>
    <Header></Header>

    <Newwav> </Newwav>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
