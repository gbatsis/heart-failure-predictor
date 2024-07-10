import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/archive">Archive</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
