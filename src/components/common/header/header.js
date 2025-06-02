import React from 'react';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'; // HamburgerMenu 컴포넌트 Import

function Header() {
  return (
      <header className="header">
          <HamburgerMenu />
      </header>
  );
}

export default Header;