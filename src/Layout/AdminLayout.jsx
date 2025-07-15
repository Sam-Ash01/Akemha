import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from "../Components/Admin/FixedComponents/AdminNavBar/AdminNavBar";
import AdminFooter from "../Components/Admin/FixedComponents/AdminFooter/AdminFooter";

function AdminLayout() {
    return (
        <>
            <AdminNavBar />
            <main>
                <Outlet />
            </main>
            <AdminFooter />
        </>
    );
}

export default AdminLayout;
