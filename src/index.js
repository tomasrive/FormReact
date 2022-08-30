import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppCopia from "./AppCopia";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppCopia />
  </React.StrictMode>
);
