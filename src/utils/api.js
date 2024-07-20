// API keys
const API_KEY = "2260693912b3e149ac97c00764339948";

export async function getLocationGeocoding(location) {
  const regex = /\d/; // \d matches any digit character (0-9)
  let searchLocationBy = "direct?q";

  if (regex.test(location)) {
    searchLocationBy = "zip?zip";
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/${searchLocationBy}=${location}&appid=${API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
  }
}

export async function getLocationCurrentWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
}

export async function getLocationWeatherForecast(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather forecast data:", error);
  }
}
