import React from 'react';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import Image from 'next/image';
import { ForecastWeather } from '..';

type DayTemperatureProps = {
  weather: ForecastWeather;
};

export function getForecastImage(description: string) {
  if (description.toLowerCase().includes("sun")) {
    return "/assets/images/weather/ic_sunny.png";
  } else if (description.toLowerCase().includes("cloud")) {
    return "/assets/images/weather/ic_partially_cloud.png";
  } else if (description.toLowerCase().includes("rain")) {
    return "/assets/images/weather/ic_rainy.png";
  } else {
    return "/assets/images/weather/ic_thunderstorm.png";
  }
}

const DayTemperature: React.FC<DayTemperatureProps> = ({ weather }) => {
  return (
    <Box
      sx={{
        px: 4,
        textAlign: 'center',
      }}
    >
      <Box
        component='span'
        sx={{
          mb: 3,
          display: 'block',
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
          textTransform: 'uppercase',
        }}
      >
        {new Date(weather.TIMESTAMP).toLocaleDateString(undefined, { weekday: "short" })}
      </Box>
      <Box
        sx={{
          display: 'inline-block',
        }}
      >
        <Image src={getForecastImage(weather.DESCRIPTION)} alt='weather' width={27} height={20} />
      </Box>
    </Box>
  );
};

export default DayTemperature;
