import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const storedUser = localStorage.getItem("data");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name,
          email: parsedUser.email,
          role: parsedUser.role,
        });
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  return (
    <>
      <Header user={user} />
      <main className="min-h-[calc(100vh-96px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
