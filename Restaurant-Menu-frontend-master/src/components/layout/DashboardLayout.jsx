import React from "react";
import Sidebar from "../sidebar/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;
