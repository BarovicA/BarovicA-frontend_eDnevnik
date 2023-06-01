import React from 'react';

const Navbar = ({ user }) => {
  return (
    <nav>
      <div>
        <span>Welcome, {user}</span>
      </div>
    </nav>
  );
};

export default Navbar;