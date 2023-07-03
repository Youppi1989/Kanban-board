import React, { useState } from 'react';
import UserMenuItem from './UserMenuItem';

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="user-menu">
      <div className="user-avatar" onClick={handleMenuToggle}>
        {}
        <span className={`arrow ${isMenuOpen ? 'up' : 'down'}`}></span>
      </div>
      {isMenuOpen && (
        <ul className="menu-items">
          {}
          <UserMenuItem label="Item 1" />
          <UserMenuItem label="Item 2" />
          <UserMenuItem label="Item 3" />
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
