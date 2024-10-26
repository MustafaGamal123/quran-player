import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./components/store/favorites-context";

import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>
);
