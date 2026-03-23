import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./DriftLanternsApp";
import MomentsPage from "./MomentsPage";
import { hasCredit, loadCredit } from "./optionalRoutes";
import "./index.css";

const CreditPage = hasCredit ? lazy(loadCredit) : null;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/moments" element={<MomentsPage />} />
          {hasCredit && CreditPage && (
            <Route
              path="/credit"
              element={
                <Suspense fallback={null}>
                  <CreditPage />
                </Suspense>
              }
            />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);