// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherForecast from "../components/WeatherForecast"; // we need to import the component we are testing

// Clean up after each test
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.clearAllMocks();
});

// Mock data for the test
const mockData = {
  weather: [{ description: "light rain", icon: "10d" }],
  main: { humidity: 85, pressure: 1013 },
  wind: { speed: 5.14 },
};

describe("WeatherForecast", () => {
  it("renders weather information correctly", () => {
    const { getByText, getByAltText } = render(
      <WeatherForecast data={mockData} />
    );

    expect(getByText(/light rain/i)).toBeInTheDocument();
    expect(getByText(/Humidity: 85%/i)).toBeInTheDocument();
    expect(getByText(/Wind Speed: 5.14 m\/s/i)).toBeInTheDocument();
    expect(getByText(/Pressure: 1013 hPa/i)).toBeInTheDocument();
    const weatherIcon = getByAltText("weather icon");
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/10d.png"
    );
  });
});
