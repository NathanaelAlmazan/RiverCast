import React from 'react';
import Stack from "@mui/material/Stack";
import { alpha, Typography, useTheme } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import Image from 'next/image';
import { ForecastWeather } from '..';

export function getRiverForecastIcon(riverlevel: number, station: string) {
 if (station === "NANGKA") {
  if (riverlevel < 17.0) return "/assets/images/weather/ic_normal.png";
  else if (riverlevel >= 17.0 && riverlevel < 18.0) return "/assets/images/weather/ic_low.png";
  else if (riverlevel >= 18.0 && riverlevel < 19.0) return "/assets/images/weather/ic_moderate.png";
  else return "/assets/images/weather/ic_high.png";
 } else {
  if (riverlevel < 14.0) return "/assets/images/weather/ic_normal.png";
  else if (riverlevel >= 14.0 && riverlevel < 15.0) return "/assets/images/weather/ic_low.png";
  else if (riverlevel >= 16.0 && riverlevel < 17.0) return "/assets/images/weather/ic_moderate.png";
  else return "/assets/images/weather/ic_high.png";
 }
}

const Report = ({ station, level, forecasts }: { station: string, level: number, forecasts: ForecastWeather[] }) => {
  const theme = useTheme();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title="Rainfall Forecast"
    >
      <Stack spacing={2}>
        {forecasts.slice(1, 8).map(weather => (
          <AppCard
            key={new Date(weather.TIMESTAMP).toISOString()}
            sxStyle={{
              position: 'relative',
              mb: 4,
              borderRadius: 4,
            }}
            contentStyle={{
              p: 3.5,
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.text.primary,
              '&:last-of-type': {
                pb: 3.5,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                position: "relative"
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  mr: 3.5,
                  '& img': {
                    width: '100%',
                  },
                }}
              >
                <Image
                  src={getRiverForecastIcon(weather.MAX_WATERLEVEL, station)}
                  alt='chart'
                  width={46}
                  height={46}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  width: 'calc(100% - 60px)',
                }}
              >
                <Box
                  sx={{
                    width: 'calc(100% - 60px)',
                  }}
                >
                  <Typography variant='h2' component='h2'>
                    {`${weather.RAINFALL.toFixed(2)}mm/hr`}
                  </Typography>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      fontSize: 14,
                    }}
                    variant='body1'
                  >
                    {new Date(weather.TIMESTAMP).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                  </Typography>
                </Box>
                {Boolean(weather.MAX_WATERLEVEL > level && (weather.MAX_WATERLEVEL - level) > 0.15) && (
                  <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <Box
                      component='span'
                      sx={{
                        borderRadius: 30,
                        fontSize: 14,
                        display: 'flex',
                        padding: '3px 6px 3px 8px',
                        fontWeight: Fonts.BOLD,
                        backgroundColor: '#fff',
                        color: '#11C15B',
                        '& .MuiSvgIcon-root': {
                          fontSize: 16,
                        },
                      }}
                    >
                      {`${(weather.MAX_WATERLEVEL - level).toFixed(2)}m`}
                      <ExpandLessIcon />
                    </Box>
                  </div>
                  )}
              </Box>
            </Box>
          </AppCard>
        ))}
      </Stack>
    </AppCard>
  );
};

export default Report;
