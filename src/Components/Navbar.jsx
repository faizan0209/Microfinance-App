import React from 'react';
import { FaPiggyBank } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow ">
      <div className="container-fluid">
        <a className="navbar-brand text-white d-flex align-items-center fw-bold fs-4" href="#">
          <FaPiggyBank className="me-2" /> Microfinance App
        </a>

        <button 
          className="navbar-toggler border-white"
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item d-flex justify-content-center align-items-center">
              < Link to ="/"className="nav-link text-white fw-semibold px-3" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link to = "/about" className="nav-link text-white fw-semibold px-3" href="#">About</Link>
            </li>
            <li className="nav-item">
              <Link to = "/contact" className="nav-link text-white fw-semibold px-3" href="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
