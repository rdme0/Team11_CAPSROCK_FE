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