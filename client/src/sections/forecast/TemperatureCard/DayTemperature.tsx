import React from 'react';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import Image from 'next/image';
import { ForecastWeather } from '..';
import { getRiverForecastIcon } from '../Report';

type DayTemperatureProps = {
  weather: ForecastWeather;
};

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
        component='span'
        sx={{
          mb: 3,
          display: 'block',
          fontWeight: Fonts.LIGHT,
          fontSize: 12
        }}
      >
        {`${weather.MAX_WATERLEVEL.toFixed(0)}m`}
      </Box>
      <Box
        sx={{
          display: 'inline-block',
        }}
      >
        <Image src={getRiverForecastIcon(weather.MAX_WATERLEVEL, weather.STATION)} alt='weather' width={27} height={20} />
      </Box>
    </Box>
  );
};

export default DayTemperature;
