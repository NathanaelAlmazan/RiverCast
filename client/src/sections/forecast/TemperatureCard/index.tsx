import React from 'react';
import { Box } from '@mui/material';
import DayTemperature, { getForecastImage } from './DayTemperature';
import { teal } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import Image from 'next/image';
import { ForecastWeather } from '..';

type TemperatureCardProps = {
  forecasts: ForecastWeather[]
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({ forecasts }) => {
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{ padding: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          py: 5,
          px: 6,
          color: 'primary.contrastText',
          flex: 1,
          backgroundColor: teal[500],
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component='h3'
            sx={{
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            Brgy. Nangka, Marikina City
          </Box>
        </Box>

        <Box
          sx={{
            py: 4,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Box
            component='h1'
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 24, sm: 36, md: 64, xl: 96 },
            }}
          >
            {`${forecasts[0].TEMPERATURE.toFixed(0)}°C`}
          </Box>
          <Box
            component='p'
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
            }}
          >
            <Image
              style={{
                marginRight: 12,
              }}
              src={getForecastImage(forecasts[0].DESCRIPTION)}
              alt='weather'
              width={24}
              height={25}
            />
            {forecasts[0].DESCRIPTION}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          py: 5,
          px: 6,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {forecasts.slice(1, 8).map((weather) => {
          return <DayTemperature key={new Date(weather.TIMESTAMP).toISOString()} weather={weather} />;
        })}
      </Box>
    </AppCard>
  );
};

export default TemperatureCard;
