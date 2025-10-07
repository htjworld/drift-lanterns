import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./DriftLanternsApp";
import MomentsPage from "./MomentsPage";
import CreditPage from "./CreditPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/credit" element={<CreditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);