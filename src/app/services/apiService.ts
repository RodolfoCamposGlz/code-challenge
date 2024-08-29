import axios from "axios";
import { IWeatherData } from "../pages/home.types";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const cache = new Map<string, any>();

export const getWeatherData = async (
  lat: string,
  lon: string
): Promise<IWeatherData[]> => {
  const key = `${lat},${lon}`;

  // Check if the data is in the cache
  if (cache.has(key)) {
    return cache.get(key);
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // Cache the response data
    cache.set(key, response.data.list);

    return response.data.list;
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};
