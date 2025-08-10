import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store/app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </Provider>
);
