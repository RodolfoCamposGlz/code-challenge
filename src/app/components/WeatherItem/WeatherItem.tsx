import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { IWeatherData } from "@/app/pages/home.types";

const WeatherItem = ({ forecast }: { forecast: IWeatherData }): JSX.Element => {
  const { weather, dt_txt } = forecast;
  const formattedDate = dayjs(dt_txt).format("YYYY-MM-DD");
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="bg-white shadow rounded-lg flex flex-col items-center p-4 m-2 w-64 ">
      <p className="font-bold">{formattedDate}</p>
      <Image
        width={100}
        height={100}
        src={iconUrl}
        alt={weather[0].description}
      />
      <p>Min: {forecast.main.temp_min}°C</p>
      <p>Max: {forecast.main.temp_max}°C</p>
    </div>
  );
};

export default WeatherItem;
