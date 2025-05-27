import React, { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// 이메일 유효성 검사 정규식
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 유효성 오류 메시지
  const navigate = useNavigate();

  // 이메일 입력 시 유효성 검사
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // 유효성 검사
    if (!EMAIL_PATTERN.test(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError(""); // 잘못된 입력 제거
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // 이메일 형식 오류가 있는 경우
    if (emailError) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      console.log("로그인 성공:", response.data);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        // 서버에서 전송된 ErrorResponse의 errorMessage를 설정
        setError(
          err.response.data.errorMessage || "알 수 없는 오류가 발생했습니다.",
        );
      } else {
        setError("서버와의 연결에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginTitle">
        이메일과 비밀번호를<br></br>입력해주세요
      </div>
      <form onSubmit={handleSubmit} className="loginForm">
        {/* 이메일 입력 필드 */}
        <div className="formGroup">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange} // 이메일 유효성 검사 핸들러
            placeholder="이메일을 입력하세요"
          />
          {/* 이메일 형식 오류 메시지 */}
          {emailError && <p className="errorMessage">{emailError}</p>}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="formGroup">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {/* 로그인 오류 메시지 */}
        {error && <p className="errorMessage">{error}</p>}

        <button type="submit" className="loginButton">
          로그인
        </button>
      </form>

      <div className="registerLinkContainer">
        계정이 없으신가요?{" "}
        <button className="registerLink" onClick={() => navigate("/register")}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
