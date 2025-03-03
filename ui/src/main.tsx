import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { pageRoutes } from "./page.tsx";
import AddEditExpensePage from "./components/EditExpensePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="expense/add" element={<AddEditExpensePage/>} /> */}
          {pageRoutes.map((r) => {
            return r.path == "/" ? (
              <Route key={r.path} index element={r.component} />
            ) : (
              <Route key={r.path} path={r.path} element={r.component} />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
