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
        {"We wanted to make predicting floods in the Philippines, especially along the Marikina River, better. Deterministic methods of predicting floods wasn't very accurate, so we made a new model. RIVERCAST model looks at lots of different weather things like rain, temperature, and wind to estimate how high the river might get. It did pretty well, getting it right about 94% of the time. But we think we can make it even better with more work and research."}
      </Typography>
    </AppCardMedia>
  );
};

export default OfficeCultureCard;
