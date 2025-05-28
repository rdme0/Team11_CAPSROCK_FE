
import React from "react";
import useAuth from "../../hooks/useAuth";
import useFormValidation from "../../hooks/useFormValidation";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { register, loading, error, setError } = useAuth();
  const {
    values,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isValid
  } = useFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!values.email || !values.password || !values.confirmPassword) {
      setError("모든 필드를 채워주세요.");
      return;
    }

    if (errors.email || errors.password || errors.confirmPassword) {
      setError("유효성 검사를 통과하지 못했습니다. 입력값을 확인해주세요.");
      return;
    }

    await register(values.email, values.password);
  };

  return (
    <div className="registerContainer">
      <div className="registerTitle">회원가입</div>

      <form onSubmit={handleSubmit} className="registerForm">
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

        <div className="formGroup">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호를 다시 입력하세요"
            disabled={loading}
          />
          {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword}</p>}
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <button
          type="submit"
          className="registerButton"
          disabled={loading || !isValid() || !values.confirmPassword}
        >
          {loading ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;