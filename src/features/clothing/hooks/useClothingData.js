// features/clothing/hooks/useClothingData.js
import { useEffect, useState } from "react";
import { fetchClothingDataByCoords } from '../api/clothingApi'; // 새로 만든 옷차림 API 함수 불러오기

const useClothingData = () => {
  const [clothingData, setClothingData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // fetchClothingDataByCoords 함수 호출 (옷차림 API)
          const data = await fetchClothingDataByCoords(latitude, longitude);
          setClothingData(data); // 옷차림 데이터 상태 업데이트
        } catch (err) {
          console.error(err);
          setError("옷차림 정보를 불러오는 데 실패했습니다."); // 에러 메시지 변경
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        if (err.code === 1) {
          setError("위치 정보 접근 권한이 필요합니다.");
        } else {
          setError("위치 정보를 가져올 수 없습니다.");
        }
        setLoading(false);
      }
    );
  }, []);

  
  return { clothingData, loading, error };
};

export default useClothingData;