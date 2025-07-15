import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const linkClasses = (path) => (
    `${activeLink === path ? 'text-[var(--primary-color)] font-bold' : 'text-black'} text-xl`
  );

  return (
    <nav className={`bg-[var(--secondary-bg-color)] pl-20 pr-20 flex justify-between items-center sticky top-0 z-50 transition-shadow duration-300  ${hasScrolled ? 'shadow-md' : ''}`}>
      <div className="flex items-center space-x-4 ">
        <Link
          to="/campaign"
          className={`rounded-bl-3xl bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-4 py-2  ${linkClasses('/donation')}`}
        >
          تبرع الآن
        </Link>
      </div>
      <div className="flex items-center space-x-10 pl-[350px]">
        <Link to="/referto" className={linkClasses('/referto')}>الإشارة لمستفيد</Link>
        <Link to="/programs" className={linkClasses('/programs')}>البرامج</Link>
        <Link to="/support" className={linkClasses('/support')}>الدعم</Link>
        <Link to="/news" className={linkClasses('/news')}>الأخبار</Link>
        <Link to="/volunteerForm" className={linkClasses('/volunteerForm')}>التطوع</Link>
        <Link to="/" className={linkClasses('/')}>الرئيسية</Link>
      </div>
      <div className="flex items-center space-x-4 ">
        <Link to="/" className="text-green-900 text-2xl ">
          <img className='' src={'Assets/Images/logo.svg'} alt="Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
