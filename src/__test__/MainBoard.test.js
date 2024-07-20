// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainBoard from "../components/MainBoard"; // we need to import the component we are testing

// Clean up after each test
afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.clearAllMocks();
});

// Mock data for the test
const mockData = {
  main: {
    pressure: 1012,
    humidity: 55,
    temp: 15,
    temp_min: 14,
    name: "New York",
  },
  wind: {
    speed: 5.1,
  },
  sys: {
    country: "US",
  },
  weather: [
    {
      description: "Cloudy",
      icon: "04d",
    },
  ],
  dt: 1635253200,
};

describe("MainBoard Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<MainBoard data={mockData} />);

    expect(getByText(/1012 hPa/i)).toBeInTheDocument();
    expect(getByText(/55%/i)).toBeInTheDocument();
    expect(getByText(/5.1 m\/s/i)).toBeInTheDocument();
  });

  it("displays the correct pressure, humidity, and wind speed", () => {
    const { getByText } = render(<MainBoard data={mockData} />);
    expect(getByText(`${mockData.main.pressure} hPa`)).toBeInTheDocument();
    expect(getByText(`${mockData.main.humidity}%`)).toBeInTheDocument();
    expect(getByText(`${mockData.wind.speed} m/s`)).toBeInTheDocument();
  });
});
