import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";

// JWT 디코딩 함수
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserEmail, setUserEmail] = useState(null); // 사용자 이름 상태
  const navigate = useNavigate();

  // 토큰 확인 및 사용자 이름 추출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.email) {
        setUserEmail(payload.email); // nickname 키는 백엔드 설정에 따라 변경
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUserEmail(null);
    closeMenu();
    navigate("/");
  };

  return (
    <div className={`hamburger-container ${isOpen ? "menu-open" : ""}`}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          {isLoggedIn ? (
            <li>
              {UserEmail ? `${UserEmail}님! ` : ""}
              <br />
              <button className="menuButton" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          ) : (
            <li>
              <button
                className="menuButton"
                onClick={() => {
                  closeMenu();
                  navigate("/login");
                }}
              >
                로그인
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default HamburgerMenu;
