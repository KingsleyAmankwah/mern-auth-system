import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { reducer } from "./context/reducer";
import { initialState } from "./context/initialState";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
