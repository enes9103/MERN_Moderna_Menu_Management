import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import UserList from "./pages/userList/userList.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
