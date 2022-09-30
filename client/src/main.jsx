import React from "react";

import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import { createRoot } from "react-dom/client";
import App from "./App";

const app = document.getElementById("app");

createRoot(app).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
