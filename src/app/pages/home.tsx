"use client";
import React, { useState } from "react";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";
import { fetchWeatherData } from "../services/apiService";
import WeatherItem from "../components/WeatherItem/WeatherItem";
import Loader from "../components/Loader/Loader";
import { ICity, IWeatherData } from "./home.types";
import dayjs from "dayjs";
const API_CITIES = "https://search.reservamos.mx/api/v2/places";

const fetcher = async (url: string): Promise<ICity[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};

export default function Home() {
  const [searchCity, setSerachCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [listWeather, setListWeather] = useState<IWeatherData[]>([]);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);

  const debouncedSearchValue: string = useDebounce(searchCity, 500);

  const { data, error, isLoading } = useSWR<ICity[]>(
    debouncedSearchValue ? `${API_CITIES}?q=${debouncedSearchValue}` : null,
    fetcher
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSerachCity(e.target.value);
    //avoid user to submit an unselected city
    if (selectedCity) {
      setSelectedCity(null);
    }
  };

  const onSelectCity = (option: ICity): void => {
    setSelectedCity(option);
    setSerachCity(`${option.city_name} ,${option.country} , ${option.display}`);
  };

  const filterNextFiveDaysUnique = (data: IWeatherData[]) => {
    const today = dayjs().startOf("day");
    const days = Array.from({ length: 5 }, (_, i) =>
      today.add(i, "day").format("YYYY-MM-DD")
    );

    const uniqueData = new Map<string, IWeatherData>();

    data.forEach((item) => {
      const itemDate = dayjs(item.dt_txt).format("YYYY-MM-DD");
      if (days.includes(itemDate) && !uniqueData.has(itemDate)) {
        uniqueData.set(itemDate, item);
      }
    });

    return Array.from(uniqueData.values());
  };

  const handleSearch = async (): Promise<void> => {
    if (!selectedCity) return;

    try {
      setIsListLoading(true);
      setListWeather([]);

      const weatherData = await fetchWeatherData(
        selectedCity.lat,
        selectedCity.long
      );
      const filteredWeatherData = filterNextFiveDaysUnique(weatherData);

      setListWeather(filteredWeatherData);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleClear = (): void => {
    setSerachCity("");
    setSelectedCity(null);
    setListWeather([]);
  };
  return (
    <div className="flex w-full max-w-4xl flex-col">
      <div className="flex flex-col lg:flex-row items-end items-end">
        <TextInput
          id="city"
          label="City"
          value={searchCity}
          onChange={handleInputChange}
          placeholder="Enter city"
          options={data}
          isLoading={isLoading}
          onSelect={onSelectCity}
          handleClear={handleClear}
        />
        <Button
          disabled={!selectedCity}
          className="ml-2 lg:w-auto lg:mt-0 w-full mt-4"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      {listWeather.length > 0 ? (
        <div className="flex flex-wrap mt-8 justify-center">
          {listWeather.map((forecast: IWeatherData) => (
            <WeatherItem key={forecast.dt_txt} forecast={forecast} />
          ))}
        </div>
      ) : isListLoading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : null}

      {error && <p className="text-red-500">Something went wrong!</p>}
    </div>
  );
}
