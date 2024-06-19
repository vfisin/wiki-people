import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {WikiDataProvider} from "./context/wiki-context/provider";
import {
    BrowserRouter as Router,
} from 'react-router-dom';

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
      <Router>
        <WikiDataProvider>
            <App />
         </WikiDataProvider>
      </Router>
  </React.StrictMode>
);
