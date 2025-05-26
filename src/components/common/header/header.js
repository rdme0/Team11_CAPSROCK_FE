import React from 'react';
import { Link } from 'react-router-dom'; // 라우팅을 위한 Link 컴포넌트 사용
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'; // HamburgerMenu 컴포넌트 Import

function Header() {
  return (
      <header className="header">
          <HamburgerMenu />
      </header>
  );
}

export default Header;