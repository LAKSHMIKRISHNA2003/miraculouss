import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ scrollToForm, scrollToServices }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="navbars navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link className="nostyle" to={'/'}>
          <div className="btn navbar-brand d-flex align-items-center">
            <img className="logo" src="/images/logos.png" alt="" />
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link state={{ target: 'home' }} className="nostyle" to={'/'}>
              <div onClick={scrollToTop} className="nav-link nav-links btn">
                Home
              </div>
            </Link>
            <Link state={{ target: 'services' }} className="nostyle" to={'/'}>
              <div onClick={scrollToServices} className="nav-link nav-links btn">
                Services
              </div>
            </Link>
            <Link state={{ target: 'contactus' }} className="nostyle" to={'/'}>
              <div onClick={scrollToForm} className="nav-link nav-links btn">
                Contact us
              </div>
            </Link>
            <Link to={'/Admin'} className="nostyle">
              <div className="nav-link nav-links btn">Admin</div>
            </Link>
            
            <Link to={'/Appointments'}>
              <button className="btn custom-button mx-2">Book An Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
