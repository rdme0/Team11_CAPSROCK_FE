import { useState, useEffect } from 'react';
import axiosInstance from '../api/AxiosInstance';

const useFineDustData = (apiEndpoint, longitude, latitude) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!longitude || !latitude) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${apiEndpoint}?longitude=${longitude}&latitude=${latitude}`
        );
        setData(response.data);
      } catch (err) {
        console.error(`Failed to fetch data from ${apiEndpoint}:`, err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, longitude, latitude]);

  return { data, error, loading };
}