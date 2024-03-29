import React from 'react';
import { IconButton, Theme } from '@mui/material';
import AppScrollbar from '../AppScrollbar';
import IntlMessages from '@crema/helpers/IntlMessages';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { notification } from '@crema/fakedb';

type AppNotificationContentProps = {
  onClose: () => void;
  sxStyle: SxProps<Theme>;
};

const AppNotificationContent: React.FC<AppNotificationContentProps> = ({
  onClose,
  sxStyle,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        height: '100%',
        ...sxStyle,
      }}
    >
      <Box
        sx={{
          padding: '5px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderBottomColor: (theme) => theme.palette.divider,
          minHeight: { xs: 56, sm: 70 },
        }}
      >
        <Typography component='h3'>
          <IntlMessages id='common.notifications' />(0)
        </Typography>
        <IconButton
          sx={{
            height: 40,
            width: 40,
            marginLeft: 'auto',
            color: 'text.secondary',
          }}
          onClick={onClose}
          size='large'
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <AppScrollbar
        sx={{
          height: { xs: 'calc(100% - 96px)', sm: 'calc(100% - 110px)' },
        }}
      >
        <Typography component="div" variant="body1" align="center" sx={{ my: 3 }}>
          No Flood Alerts
        </Typography>
      </AppScrollbar>
    </Box>
  );
};

export default AppNotificationContent;
