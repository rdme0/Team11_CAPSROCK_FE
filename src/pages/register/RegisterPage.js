import React, { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./RegisterPage.css"; // 스타일 파일 연결

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  // 유효성 검사 및 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      setError("모든 필드를 채워주세요.");
      return;
    }
    if (!validateEmail(email)) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // API 호출 (POST 요청)
          const response = await axiosInstance.post("/api/register", {
            email,
            password,
            latitude,
            longitude, // 위치 정보 추가
          });

          console.log("회원가입 성공:", response.data);
          setSuccess(true);

          // WeatherPage로 이동
          navigate("/weather");
        } catch (err) {
          console.error("회원가입 요청 오류:", err);
          setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      }, (err) => {
        console.error("위치 정보 가져오기 오류:", err);
        setError("위치 정보를 가져오는데 실패했습니다. 브라우저 설정을 확인해주세요.");
      });
    } else {
      setError("브라우저에서 위치 정보를 지원하지 않습니다.");
    }
  };

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
      <div className="register-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {/* 이메일 입력 */}
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          {/* 오류 메시지 */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">회원가입 성공!</p>}

          {/* 회원가입 버튼 */}
          <button type="submit" className="register-button">
            회원가입
          </button>
        </form>
      </div>
  );
};

export default RegisterPage;