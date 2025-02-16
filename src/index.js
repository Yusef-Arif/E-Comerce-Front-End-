import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./css/components/loading-page.css";
import "./css/components/form.css";
import "./css/components/alert.css";
import "./css/base/media.css";
import "./components/dashboard/Bars.css";
import "./css/Errors.css"
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToggleProvider from "./context/Menu";
import ScreenProvider from './context/ScreenSize';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScreenProvider>
        <ToggleProvider>
          <App />
        </ToggleProvider>
      </ScreenProvider>
    </BrowserRouter>
  </React.StrictMode>
);

