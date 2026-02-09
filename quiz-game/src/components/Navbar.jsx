import React from 'react';

function Navbar({ onNavigate, currentView }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">Quiz Game</h1>
        <ul className="nav-menu">
          <li className={`nav-item ${currentView === 'home' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => onNavigate('home')}>Home</button>
          </li>
          <li className={`nav-item ${currentView === 'rules' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => onNavigate('rules')}>Rules</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
