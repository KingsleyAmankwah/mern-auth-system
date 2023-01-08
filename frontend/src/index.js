// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { StateProvider } from "./context/StateProvider";
// import { initialState } from "./context/initialState";
// import reducer from "./context/reducer";
// import "./index.css";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <App />
//     </StateProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
