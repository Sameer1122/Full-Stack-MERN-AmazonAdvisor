import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AdContextProvider } from "./store/ad-context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdContextProvider>
        <App />
      </AdContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
