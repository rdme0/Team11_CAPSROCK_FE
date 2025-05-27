import React, { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 오류 메시지
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 확인 오류
  const [error, setError] = useState(""); // 일반 오류 메시지
  const navigate = useNavigate();

  const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 이메일 입력 유효성 검사
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!EMAIL_PATTERN.test(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError(""); // 이메일 형식이 올바르면 초기화
    }
  };

  // 비밀번호 입력 유효성 검사
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value || value.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (value.length < 8) {
      setPasswordError("비밀번호는 최소 8자여야 합니다.");
    } else {
      setPasswordError(""); // 비밀번호 형식이 올바르면 초기화
    }
  };

  // 비밀번호 확인 입력 검사
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError(""); // 비밀번호 확인 맞으면 초기화
    }
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 필수값 확인
    if (!email || !password || !confirmPassword) {
      setError("모든 필드를 채워주세요.");
      return;
    }

    // 이메일, 비밀번호, 비밀번호 확인 유효성 검사
    if (emailError || passwordError || confirmPasswordError) {
      setError("유효성 검사를 통과하지 못했습니다. 입력값을 확인해주세요.");
      return;
    }

    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axiosInstance.post("/api/register", {
                email,
                password,
                latitude,
                longitude,
              });

              console.log("회원가입 성공:", response.data);
              alert("회원가입이 완료되었습니다!");
              navigate("/");
            } catch (err) {
              if (err.response && err.response.data) {
                setError(err.response.data.errorMessage || "회원가입 중 오류가 발생했습니다.");
              } else {
                setError("서버와의 연결에 실패했습니다. 다시 시도해주세요.");
              }
            }
          },
          (err) => {
            console.error("위치 정보 오류:", err);
            setError("위치 정보를 가져오는 데 실패했습니다.");
          }
      );
    } else {
      setError("브라우저에서 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
      <div className="registerContainer">
        <div className="registerTitle">회원가입</div>
        <form onSubmit={handleSubmit} className="registerForm">
          {/* 이메일 입력 */}
          <div className="formGroup">
            <label htmlFor="email">이메일</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
            />
            {emailError && <p className="errorMessage">{emailError}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="formGroup">
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요"
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="formGroup">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호를 다시 입력하세요"
            />
            {confirmPasswordError && <p className="errorMessage">{confirmPasswordError}</p>}
          </div>

          {error && <p className="errorMessage">{error}</p>}

          <button type="submit" className="registerButton">
            회원가입
          </button>
        </form>
      </div>
  );
};

export default RegisterPage;