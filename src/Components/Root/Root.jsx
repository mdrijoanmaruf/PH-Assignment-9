import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Root = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div>
         <Navbar></Navbar>
        <main className="pt-16">
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Root