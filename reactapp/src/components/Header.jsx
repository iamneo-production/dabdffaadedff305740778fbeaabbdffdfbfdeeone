import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <h1 data-testid = "app_title" className="header-title">Library Collection App</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/addCollection" className="nav-link">Add Collection</Link>
          </li>
          <li className="nav-item">
            <Link to="/displaycollection" className="nav-link">Display Collection</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
