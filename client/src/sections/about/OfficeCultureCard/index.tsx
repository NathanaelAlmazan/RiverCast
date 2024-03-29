import React from 'react';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCardMedia from '@crema/components/AppCard/AppCardMedia';


const OfficeCultureCard = () => {
  return (
    <AppCardMedia sxStyle={{ height: '100%' }} cardMedia="/assets/images/banner/bg_forecasting.jpg">
      <Typography
        component='h3'
        sx={{ fontSize: 16, fontWeight: Fonts.SEMI_BOLD, mb: { xs: 2, md: 4 } }}
      >
        Abstract
      </Typography>
      <Typography
        sx={{ mb: 2, color: (theme) => theme.palette.text.secondary }}
      >
        The study aimed to improve flood forecasting in the Philippines, focusing on the Marikina River, 
        which often experiences flooding due to various meteorological factors. The existing deterministic 
        river level forecasting system lacked accuracy, prompting the development of a new model capable of capturing 
        complex relationships between meteorological conditions and river behavior. Using historical data on 
        precipitation, temperature, humidity, and wind speed, the Auto-Regressive Transformer model achieved 
        an accuracy of 94%. However, further improvements are still possible, suggesting the need for 
        continued research and refinement to enhance forecasting capabilities.
      </Typography>
    </AppCardMedia>
  );
};

export default OfficeCultureCard;
