import React from 'react';
import { Box } from '@mui/material';
import DayTemperature from './DayTemperature';
import { teal } from '@mui/material/colors';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import Image from 'next/image';
import { ForecastWeather } from '..';
import { capitalCase } from 'change-case';
import { getRiverForecastIcon } from '../Report';

type TemperatureCardProps = {
  station: string
  forecasts: ForecastWeather[]
};

export function getRiverForecastDescription(riverlevel: number, station: string) {
  if (station === "NANGKA") {
   if (riverlevel < 17.0) return "Normal river level";
   else if (riverlevel >= 17.0 && riverlevel < 18.0) return "Elevated river level";
   else if (riverlevel >= 18.0 && riverlevel < 19.0) return "Heightened river level";
   else return "critical river level";
  } else {
   if (riverlevel < 14.0) return "Normal river level";
   else if (riverlevel >= 14.0 && riverlevel < 15.0) return "Elevated river level";
   else if (riverlevel >= 16.0 && riverlevel < 17.0) return "Heightened river level";
   else return "Critical river level";
  }
 }

const TemperatureCard: React.FC<TemperatureCardProps> = ({ station, forecasts }) => {
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
          backgroundColor: teal[100],
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
              color: teal[800]
            }}
          >
            {`Brgy. ${capitalCase(station)}, Marikina City`}
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
              color: teal[800], 
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 24, sm: 36, md: 64, xl: 96 },
            }}
          >
            {`${forecasts[0].MAX_WATERLEVEL.toFixed(0)}m`}
          </Box>
          <Box
            component='p'
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
              color: teal[800]
            }}
          >
            <Image
              style={{
                marginRight: 12
              }}
              src={getRiverForecastIcon(forecasts[0].MAX_WATERLEVEL, station)}
              alt='weather'
              width={24}
              height={25}
            />
            {getRiverForecastDescription(forecasts[0].MAX_WATERLEVEL, station)}
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
