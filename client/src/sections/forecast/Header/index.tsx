import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';

const Header = () => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundImage: `url(/assets/images/widgets/river.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        color: 'white',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          left: '0',
          top: '0',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        },
        '& > *': {
          position: 'relative',
          zIndex: 3,
        },
      }}
      titleStyle={{ color: 'white' }}
      title="RiverCast"
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '70%', xl: '50%' },
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="p"
          sx={{
            fontSize: 14,
          }}
        >
          {"RiverCast aims to develop a model that forecasts Marikina River level a week in advance using satellite-driven meteorological forecasts as input."}
        </Box>

        <Box
          sx={{
            pt: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            component="a"
            href="/about"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: Fonts.LIGHT,
              fontSize: 14,
              mr: 4,
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Header;
