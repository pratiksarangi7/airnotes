import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FirebaseProvider from "./context/firebase.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import RecentUploadsProvider from "./context/recent_uploads.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <RecentUploadsProvider>
          <App />
        </RecentUploadsProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
