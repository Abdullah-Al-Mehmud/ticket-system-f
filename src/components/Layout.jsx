import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
          <Navbar />
          <main className="min-h-[calc(100vh-96px)]">
               <Outlet />
          </main>  
            <Footer />
        </>
    );
};

export default Layout;