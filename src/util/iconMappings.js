export const getWeatherIcon = (weatherCode) => {
  const weatherIcons = {
    0: "lightning",
    1: "rainy",
    2: "rainy",
    3: "snowy",
    4: "mist",
    5: "windy",
    6: "windy",
    7: "sunny",
    8: "littleCloudy",
    9: "cloudy",
    10: "rainy",
  };
  return weatherIcons[weatherCode] || "sunny";
};

export const getClothingIcon = (clothingCode) => {
  const clothingIcons = {
    1: "t-shirts",
    2: "t-shirts",
    3: "longSleeve",
    4: "hoodie",
    5: "jacket",
    6: "trenchCoat",
    7: "woolCoat",
    8: "paddingJacket",
  };
  return clothingIcons[clothingCode] || "hoodie";
};

export const getUltravioletIcon = (ultravioletCode) => {
  const ultravioletIcons = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };
  return ultravioletIcons[ultravioletCode] || "safe";
};

export const getUltravioletLevelText = (ultravioletCode) => {
  const ultravioletTexts = {
    1: "낮음",
    2: "보통",
    3: "높음",
    4: "매우 높음",
    5: "위험",
  };
  return ultravioletTexts[ultravioletCode] || "낮음";
}

export const getFineDustIcon = (level) => {
  const iconMappings = {
    1: "good",           // 좋음
    2: "fair",           // 보통
    3: "moderate",       // 민감군주의
    4: "poor",           // 나쁨
    5: "veryPoor"       // 매우나쁨
  };
  
  return iconMappings[level] || "fair";
};