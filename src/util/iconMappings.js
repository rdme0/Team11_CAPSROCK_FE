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
    0: "safe",
    1: "excellent",
    2: "good",
    3: "moderate",
    4: "bad",
    5: "veryBad",
  };
  return ultravioletIcons[ultravioletCode] || "safe";
};

export const getUltravioletLevelText = (ultravioletCode) => {
  const ultravioletTexts = {
    0: "안전",
    1: "매우 좋음",
    2: "좋음",
    3: "보통",
    4: "나쁨",
    5: "매우 나쁨",
  };
  return ultravioletTexts[ultravioletCode] || "안전";
};