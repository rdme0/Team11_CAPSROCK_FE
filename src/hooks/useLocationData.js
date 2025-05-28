import { useState, useEffect } from 'react';

const useLocationData = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setLoading(false);
          },
          (err) => {
            console.error("Failed to get user location:", err);
            setError("위치 정보를 가져오지 못했습니다.");
            setLoading(false);
          },
          {
            enableHighAccuracy: false,   // 빠르게 받기 위해 false
            timeout: 2000,               // 2초 이내로 위치 못 받으면 실패 처리
            maximumAge: 1800000
          }
        );
      } else {
        setError("Geolocation을 지원하지 않는 브라우저입니다.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return { longitude, latitude, error, loading };
};

export default useLocationData;
