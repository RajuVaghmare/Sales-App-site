import React from 'react'; 
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../Redux/Action';

// Function to close the navigation menu on selecting any navLink(on small devices) 
const closeNav = () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler && window.innerWidth <= 992) {
    navbarToggler.click();
  }
};

const Navbar = () => {
  const dispatch = useDispatch();
  
  // Get user information from Redux store
  const user1 = useSelector(state => state.userReducer.user.email);

  // Logout function
  const logout = (() => {
    // Clears user data from localStorage and dispatch logout action
    localStorage.removeItem("tokenhulululu");
    localStorage.removeItem("user");
    dispatch({ type: USER_LOGOUT });
  });

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand navbar-brand-style" to="/">SALES APP</Link>
          {/* Navbar Toggler Button */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* Navigation Links */}
              <Link className={`nav-link nav-link-style ${user1 ? '' : 'disabled-link'}`} to="/addsales" onClick={closeNav}>ADD SALES</Link>
              <Link className={`nav-link nav-link-style ${user1 ? '' : 'disabled-link'}`} to="/topfivesales" onClick={closeNav}>TOP 5 SALES</Link>
              <Link className={`nav-link nav-link-style ${user1 ? '' : 'disabled-link'}`} to="/todayrevenue" onClick={closeNav}>TODAY'S TOTAL REVENUE</Link>
              {/* Conditional Login and Register Links */}
              {user1 ? "" : <Link className="nav-link nav-link-style " to="/login" onClick={closeNav} >LOGIN</Link>}
              {!user1 ? <Link className="nav-link nav-link-style" to="/register" onClick={closeNav}>REGISTER</Link> : ''}
              {/* Conditional Logout Link */}
              {user1 ? <><Link className="nav-link nav-link-style " onClick={() => logout()} > LOGOUT </Link> </> : ""}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
