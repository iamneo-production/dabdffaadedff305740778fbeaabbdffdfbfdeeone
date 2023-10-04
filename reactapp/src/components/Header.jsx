 import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header className="header">
      <h1 data-testid = "app-title" className="header-title">Employee Task Management System</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/addtask" className="nav-link">Add Task</Link>
          </li>
          <li className="nav-item">
            <Link to="/displaytasks" className="nav-link">Display Tasks</Link>
          </li>
        </ul>
      </nav>
      <button className="reload-button" onClick={reloadPage}>Reload</button>
    </header>
  );
};

export default Header;
