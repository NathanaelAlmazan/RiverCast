import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Typography, useTheme } from '@mui/material';
import AppCard from '@crema/components/AppCard';

import AgeOfAudience from '../AgeOfAudience';

const BlogDetailContent = () => {
  const theme = useTheme();

  return (
    <AppCard sxStyle={{ color: theme.palette.text.secondary }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Stack spacing={3}>
            <Typography component='div' variant='h2'>
              Our Mission
            </Typography>
            <Typography component='p' variant='body1'>
              {
                'The Philippines, located in the Northwest Pacific, faces frequent heavy rainfall due to tropical storms, thunderstorms, and weather patterns like the Intertropical Convergence Zone. On average, the country experiences about twenty storms annually, with eight making landfall. This rainfall often leads to floods. Over the years, floods, storms, tsunamis, and landslides have caused significant loss of life and damage, totaling 70,000 deaths and twenty-three billion dollars since 1990.'
              }
            </Typography>
            <Typography component='p' variant='body1'>
              {
                'Currently, when rivers reach critical levels, evacuation orders are issued to protect communities. However, a new study seeks to improve this process by predicting river behavior weeks in advance. By analyzing satellite-based weather data, we aim to identify key meteorological factors influencing river levels. Our goal is to develop a forecasting model specifically for the Marikina River, helping authorities better prepare and respond to potential flooding.'
              }
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <AgeOfAudience audienceData={importances} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Typography component='div' variant='h2'>
              The Variables
            </Typography>
            <Typography component='p' variant='body1'>
              {
                'We gathered weather data like rain, humidity, temperature, wind, and river levels from 2012 to 2023 around Marikina River. The government helped by giving us access to sensors along the river. Sometimes data was missing, so we got help from other sources like OpenWeather™ and NASA.'
              }
            </Typography>
            <Typography component='p' variant='body1'>
              {
                "We used a special computer program called a 'random forest' to study how these different weather factors affect the level of the Marikina River. Imagine each factor is like a puzzle piece, and together they make up the whole picture of how high or low the river might be. Some puzzle pieces are more important than others in making the picture accurate."
              }
            </Typography>
            <Typography component='p' variant='body1'>
              {
                "Our experiment showed that rain, temperature, and what day of the year it is had the biggest impact on predicting the river level. This means when it rains a lot, or it's really cold, the river tends to rise. Also, we found that the time of year is important too, as the river behaves differently in different seasons."
              }
            </Typography>
            <Typography component='p' variant='body1'>
              {
                "Speaking of random forest, it is an ensemble of decision trees, Think of it like a brainstorming meeting. Imagine you have a big question, like 'What will be the river level tomorrow?' Instead of asking just one person for an answer, you ask a bunch of friends who are really good at predicting weather. Each friend is like a 'tree' in the forest. Now, each friend (or tree) looks at different factors, like if it's cloudy today, how much it rained yesterday, and so on. They each give their own prediction based on these factors. By putting all their answers together, we usually get a more accurate prediction than if we just asked one friend."
              }
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={3}>
            <Typography component='div' variant='h2'>
              Time Series Forecasting
            </Typography>
            <Typography component='p' variant='body1'>
              {"Now that the variables necessary to estimate Marikina River level are identified, the study explored the best way to predict how high the Marikina River will be for the next seven days. We know that things like rain, temperature, wind, and humidity affect the river level, but we also need to think about how the river changes over time - like if it's higher in the rainy season and lower in the dry season."}
            </Typography>
            <Typography component='p' variant='body1'>
              {"To figure this out, we use a method called 'multivariate time-series forecasting.' It's like looking at a bunch of different things that change over time and trying to predict what will happen next. We tried different multivariate time-series forecasting techniques, like Vector Auto-Regressive (VAR), which is good at spotting patterns in lots of different data, and Auto-Regressive Integrated Moving Average (ARIMA), which is good at predicting based on past values. Then, there's Long-Short Term Memory (LSTM), which is a fancy type of neural network that's great at finding patterns in sequences of data. But sometimes, it struggles with really long sequences."}
            </Typography>
            <Typography component='p' variant='body1'>
              {"So, we ended up choosing something called a 'Transformer.' It's a newer type of model that's good at handling lots of data and doesn't have the same problems with long sequences. It's like having a really smart system that can learn from all the different factors and how they change over time to make better predictions about the river level."}
            </Typography>
            <Typography component='p' variant='body1'>
              {
                'The carousell below explains each layer of the RiverCast architecture.'
              }
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default BlogDetailContent;

const importances = [
  {
    id: 1,
    title: 'Precipitation',
    value: 48,
    color: '#0A8FDC',
  },
  {
    id: 3,
    title: 'Temperature',
    value: 31,
    color: '#ff3939',
  },
  {
    id: 4,
    title: 'Day of Year',
    value: 16,
    color: '#F04F47',
  },
  {
    id: 2,
    title: 'Humidity',
    value: 5,
    color: '#54B435',
  },
];
