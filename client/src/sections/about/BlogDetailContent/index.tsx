import React from 'react';
import Grid from "@mui/material/Grid";
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
          <Typography component="div" variant='h2'>
            Our Mission
          </Typography>
          <Typography component="p" variant='body1'>
            {"The Philippines' location in the Northwest Pacific Basin made it prone to precipitation-producing meteorological phenomena, " +
            "including tropical cyclones, thunderstorms, and the Intertropical Convergence Zone. According to PAGASA, the Philippines experiences " +
            "an average of twenty storms per year, and eight of them reached landfall. These phenomena could cause excessive rainfall resulting " +
            "in flooding. According to the World Bank, floods, cyclones, tsunamis, and landslides had caused 70,000 deaths and twenty-three " +
            "billion dollars in casualties since 1990 in the Philippines. Currently, evacuation protocols rely on detected river levels. " +
            "They issued evacuation orders when the river level reached its critical level. In comparison, the study aims to develop a forecasting " +
            "model that could simulate river behavior weeks in advance using satellite-driven meteorological data. To achieve this mission, the study " +
            "investigated meteorological variables that affects river level significantly and experimented with different models to find the best " +
            "forecasting algorithm for Marikina River level."}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <AgeOfAudience audienceData={importances} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Typography component="div" variant='h2'>
            The Variables
          </Typography>
          <Typography component="p" variant='body1'>
            {"The study utilized meteorological data from 2012 to 2023, including precipitation, humidity, temperature, " +
            "wind speed, and direction, along with Marikina River level data from the Philippine Atmospheric, Geophysical, " +
            "and Astronomical Services Administration (PAGASA), Metropolitan Manila Development Authority (MMDA), " +
            "and Marikina City Hall. These government agencies facilitated and maintained the meteorological and river level " +
            "sensors along Marikina River. Moreover, to fill the missing data, the researchers utilized OpenWeather™ and " +
            "NASA meteorological database."}
          </Typography>
          <Typography component="p" variant='body1'>
            {"Using a random forest model, the researchers investigated how these factors influence the Marikina River's " +
            "water level. Feature importance in a random forest model measures the impact of each factor on the model's " +
            "predictions, much like pieces of a puzzle contributing to the overall picture. Features with a significant " +
            "impact on prediction accuracy are considered more important, while those with less impact are deemed less " +
            "important. This analysis helps identify which factors are most crucial for accurately predicting the " +
            "Marikina River's water level."}
          </Typography>
          <Typography component="p" variant='body1'>
            {"The findings demonstrated that precipitation, temperature, and the day of the year exerted the most significant " +
            "influence on the accuracy of estimating the Marikina River level. This indicates a strong correlation between " +
            "variations in precipitation and temperature and fluctuations in river levels. Furthermore, seasonal changes were " +
            "found to provide valuable insights into the dynamic behavior of the river across different times of the year."}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={3}>
          <Typography component="div" variant='h2'>
            Time Series Forecasting
          </Typography>
          <Typography component="p" variant='body1'>
            {"Now that the variables necessary to estimate Marikina River level are identified, " +
            "the study explored the best way to understand how precipitation, temperature, wind speed, " +
            "and humidity affect the Marikina River level. But we're also considering something important: " +
            "the time of year. This helps us see how the river behaves over time. We're using a method " +
            "called 'multivariate time-series forecasting' to analyze all these factors at different times " +
            "and make forecasts."}
          </Typography>
          <Typography component="p" variant='body1'>
            {"To predict future water levels, we needed to understand how factors like precipitation, " + 
            "temperature, wind speed, humidity, and the Marikina River level change over time. We explored different " +
            "models to extract these patterns, including Vector Auto-Regressive (VAR), Auto-Regressive Integrated Moving " +
            "Average (ARIMA), Long-Short Term Memory (LSTM), and Transformer. While VAR was traditionally used " +
            "for multivariate modeling, recent studies showed its ability to capture non-linear patterns effectively. " +
            "However, deep learning models like LSTM, which outperformed linear auto-regressive models, faced challenges " +
            "with vanishing and exploding gradients, affecting their long-term dependency capturing. Fortunately, the " +
            "Transformer architecture, introduced by Vaswani et al. (2017), addressed these issues and showed promise " +
            "in multivariate time series forecasting. Considering this, we opted to utilize a Transformer-based " +
            "architecture in our study."}
          </Typography>
          <Typography component="p" variant='body1'>
            {"The carousell below explains each layer of the RiverCast architecture."} 
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
    title: "Precipitation",
    value: 48,
    color: "#0A8FDC",
  },
  {
    id: 3,
    title: "Temperature",
    value: 31,
    color: "#ff3939",
  },
  {
    id: 4,
    title: "Day of Year",
    value: 16,
    color: "#F04F47",
  },
  {
    id: 2,
    title: "Humidity",
    value: 5,
    color: "#54B435",
  }
];