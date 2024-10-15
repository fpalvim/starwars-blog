import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StarWarsProvider } from "./context/MyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StarWarsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StarWarsProvider>
  </React.StrictMode>
);
