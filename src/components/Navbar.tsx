import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isInformationPage = location.pathname === '/addresses';

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__icon">
          <img src="/logo/react.svg" alt="Logo" className="navbar-logo" />
        </li>
        <div className="navbar__item">
          <li>
            <Link
              to="/addresses"
              className={`navbar-link ${
                !isInformationPage ? 'navbar-link-green' : ''
              }`}
            >
              مشاهده آدرس ها
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`navbar-link ${
                isInformationPage ? 'navbar-link-green' : ''
              }`}
            >
              ثبت آدرس
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
