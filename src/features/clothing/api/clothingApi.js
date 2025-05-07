// features/clothing/api/clothingApi.js
import axiosInstance from '../../../api/AxiosInstance'; // 설정된 Axios 인스턴스 가져오기

const mockClothingData = {
    "dashboard": {
        "address": {
            "level1": "서울특별시",
            "level2": "중구"
        },
        "cloth": 2,
        "feelsLikeTemp": 7.75,
        "correction": +1.25
    },
    "next23HoursWeathers": [
        { "time": "2025-04-02 22:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-02 23:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 00:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 01:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 02:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 03:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 04:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 05:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 06:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 07:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 08:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 09:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 10:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 11:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 12:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 13:00:00", "clothing": 3, "feelsLikeTemp": 7.75 },
        { "time": "2025-04-03 14:00:00", "clothing": 3, "feelsLikeTemp": 7.75 }
    ],
    "next7DaysWeathers": [
        { "day": "2025-04-02 12:00:00", "dayOfWeek": "수요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-03 12:00:00", "dayOfWeek": "목요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-04 12:00:00", "dayOfWeek": "금요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-05 12:00:00", "dayOfWeek": "토요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-06 12:00:00", "dayOfWeek": "일요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-07 12:00:00", "dayOfWeek": "월요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 },
        { "day": "2025-04-08 12:00:00", "dayOfWeek": "화요일", "feelsLikeMaxTemp": 15.37, "feelsLikeMinTemp": 7.28, "maxTempClothing": 3, "minTempClothing": 5 }
    ]
};

export const fetchClothingDataByCoords = async (latitude, longitude) => {
//   try {
//     const response = await axiosInstance.get("/api/clothing", {
//       params: {
//         latitude,
//         longitude,
//       },
//     });
//     return response.data; 
//   } catch (error) {
//     console.error("API Error fetching clothing data:", error);
//     throw error;
//   }

    return Promise.resolve(mockClothingData);
    //목업 데이터 반환 코드
};