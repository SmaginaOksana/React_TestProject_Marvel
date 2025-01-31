import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
