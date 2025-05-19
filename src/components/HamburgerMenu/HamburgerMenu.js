import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 라우팅을 위해 react-router-dom의 Link 사용
import './HamburgerMenu.css'; // 컴포넌트 스타일 파일 import

function HamburgerMenu() {
  // 메뉴 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 햄버거 아이콘 클릭 시 상태 토글
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // 메뉴 항목(Link)을 클릭 시 메뉴를 닫는 함수
  const closeMenu = () => {
    // setIsOpen 함수를 호출하여 isOpen 값을 무조건 false로 설정합니다.
    setIsOpen(false);
  };

  return (
    <div className={`hamburger-container ${isOpen ? 'menu-open' : ''}`}> {/* 상태에 따라 클래스 추가 */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* 메뉴 오버레이 (메뉴 외 영역 클릭 시 닫기 위함) */}
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      {/* 슬라이드 메뉴 */}
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          {/* Link 컴포넌트로 각 페이지에 연결 */}
          <li><Link to="/login" onClick={closeMenu}>로그인</Link></li>
          {/* 필요에 따라 다른 메뉴 항목 추가 */}
        </ul>
      </nav>
    </div>
  );
}

export default HamburgerMenu;