import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoggedInRoutes from "./ristrict_routes/LoggedInRoutes";
import NotLoggedInRoutes from "./ristrict_routes/NotLoggedInRoutes";
import RegisteredRoutes from "./ristrict_routes/RegisteredRoutes";
import { connectToSocketServer, joinUser } from "./SocketIOConnection";
import { useSelector } from "react-redux";

const App = () => {
  const { loggedUser } = useSelector((store) => store.currentUser);
  //Web socket actions
  useEffect(() => {
    connectToSocketServer();
  }, []);
  useEffect(() => {
    if (loggedUser) {
      joinUser(loggedUser.id);
    }
  }, [loggedUser]);
  return (
    <div className="dark ">
      <ToastContainer position="bottom-center" limit={1} />

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RegisteredRoutes />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
