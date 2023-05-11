import React from 'react';
import "./Admin.scss";
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin">
        <div className="admin-left">
            Menu
        </div>
        <div className="admin-right">
            <Outlet />
        </div>
    </div>
  )
}

export default Admin