import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
