import React from "react";
import useAuth from "../../hooks/useAuth";
import useFormValidation from "../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { login, loading, error, setError } = useAuth();
  const { values, errors, handleEmailChange, handlePasswordChange, isValid } = useFormValidation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!values.email || !values.password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (errors.email) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    await login(values.email, values.password);
  };

  return (
    <div className="loginContainer">
      <div className="loginTitle">
        이메일과 비밀번호를<br />입력해주세요
      </div>

      <form onSubmit={handleSubmit} className="loginForm">
        <div className="formGroup">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
            disabled={loading}
          />
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>

        <div className="formGroup">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
            disabled={loading}
          />
          {errors.password && <p className="errorMessage">{errors.password}</p>}
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <button
          type="submit"
          className="loginButton"
          disabled={loading || !isValid()}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="registerLinkContainer">
        계정이 없으신가요?{" "}
        <button
          className="registerLink"
          onClick={() => navigate("/register")}
          disabled={loading}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;