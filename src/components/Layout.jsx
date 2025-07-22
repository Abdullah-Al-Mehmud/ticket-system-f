import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
          <Header />
          <main className="min-h-[calc(100vh-96px)]">
               <Outlet />
          </main>  
            <Footer />
        </>
    );
};

export default Layout;