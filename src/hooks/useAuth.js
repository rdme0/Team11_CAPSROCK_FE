import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';
import useLocationData from './useLocationData';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { longitude, latitude, loading: locationLoading, error: locationError } = useLocationData();

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    if (locationLoading) {
      setError('위치 정보를 가져오는 중입니다...');
      setLoading(false);
      return;
    }

    if (locationError) {
      setError(locationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
        longitude,
        latitude,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.errorMessage || '알 수 없는 오류가 발생했습니다.');
      } else {
        setError('서버와의 연결에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError('');

    if (locationLoading) {
      setError('위치 정보를 가져오는 중입니다...');
      setLoading(false);
      return;
    }

    if (locationError) {
      setError(locationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/register', {
        email,
        password,
        longitude,
        latitude,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.errorMessage || '회원가입 중 오류가 발생했습니다.');
      } else {
        setError('서버와의 연결에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading: loading || locationLoading,
    error: error || locationError,
    setError,
  };
};

export default useAuth;