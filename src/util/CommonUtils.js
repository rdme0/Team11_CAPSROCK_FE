
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email) => {
  if (!email) return "이메일을 입력해주세요.";
  if (!EMAIL_PATTERN.test(email)) return "올바른 이메일 형식이 아닙니다.";
  return "";
};

export const validatePassword = (password) => {
  if (!password || password.trim() === "") return "비밀번호를 입력해주세요.";
  if (password.length < 8) return "비밀번호는 최소 8자여야 합니다.";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "비밀번호 확인을 입력해주세요.";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  return "";
};