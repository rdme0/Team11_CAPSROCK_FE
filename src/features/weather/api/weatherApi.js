import axiosInstance from '../../../api/AxiosInstance'; // 설정된 Axios 인스턴스 가져오기

export const fetchWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await axiosInstance.get("/api", { 
      params: {
        latitude,
        longitude,
      },
    });
    return response.data; // 데이터 반환
  } catch (error) {
    // 에러 로깅 또는 추가 처리
    console.error("API Error fetching weather data:", error);
    throw error; // 에러를 다시 던져서 호출한 곳(훅)에서 처리하도록 함
  }
};