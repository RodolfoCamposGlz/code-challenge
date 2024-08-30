import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./home";
import { getWeatherData } from "../services/apiService";
import useSWR from "swr";
// Mocking the services
jest.mock("../services/apiService", () => ({
  getWeatherData: jest.fn(),
}));

test("renders Home component", () => {
  render(<Home />);
  expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
});

test("handles user input in TextInput", () => {
  const { getByPlaceholderText } = render(<Home />);
  const input = getByPlaceholderText(/Enter city/i);
  fireEvent.change(input, { target: { value: "Mexico City" } });
  expect(input).toHaveValue("Mexico City");
});

it("handles no selected city", () => {
  render(<Home />);

  // Ensure button is disabled when no city is selected
  expect(screen.getByRole("button", { name: /Search/i })).toBeDisabled();
});

describe("Home Weather Search", () => {
  const mockCities = [
    {
      id: 1,
      city_name: "Ciudad de México",
      country: "México",
      display: "Ciudad de México",
      lat: "19.4326",
      long: "-99.1332",
    },
    {
      id: 2,
      city_name: "New York",
      country: "USA",
      display: "New York City",
      lat: "40.7128",
      long: "-74.0060",
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCities),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should allow the user to write in the input and select an option from the list", async () => {
    render(<Home />);

    // Type into the input field
    const input = screen.getByPlaceholderText("Enter city");

    // Focus the input to open the dropdown
    fireEvent.focus(input);

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "Ciudad" } });

    // Wait for the loading state to appear
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    // Wait for the city options to appear
    await waitFor(() => {
      expect(
        screen.getByText("Ciudad de México, México, Ciudad de México")
      ).toBeInTheDocument();
      expect(
        screen.getByText("New York, USA, New York City")
      ).toBeInTheDocument();
    });

    // Select an option from the list
    fireEvent.click(
      screen.getByText("Ciudad de México, México, Ciudad de México")
    );

    // Check if the input value updates correctly after selecting the city
    expect(input).toHaveValue("Ciudad de México ,México , Ciudad de México");
  });
});
