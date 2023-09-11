import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoggedInRoutes from "./ristrict_routes/LoggedInRoutes";
import NotLoggedInRoutes from "./ristrict_routes/NotLoggedInRoutes";

const App = () => {
  return (
    <div className="dark">
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
