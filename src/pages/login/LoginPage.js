import React, { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      console.log("로그인 성공:", response.data);
      alert("로그인 성공!");

      // WeatherPage로 이동
      navigate("/weather");
    } catch (err) {
      console.error("로그인 요청 오류:", err);
      setError("로그인 실패. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        {/* 회원가입으로 이동하는 버튼 */}
        <p>
          계정이 없으신가요?{" "}
          <button
              className="register-link"
              onClick={() => navigate("/register")}
          >
            회원가입
          </button>
        </p>
      </div>
  );
};

export default LoginPage;