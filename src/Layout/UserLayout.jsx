// src/Layout/UserLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from "../Components/User/FixedComponents/NavBar/NavBar";
import Footer from "../Components/User/FixedComponents/Footer/Footer";

function UserLayout() {

    return (
        <div className='bg-[var(--primary-bg-color)]'>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default UserLayout;
