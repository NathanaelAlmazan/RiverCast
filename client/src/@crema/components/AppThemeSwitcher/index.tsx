import React from 'react';
import { IconButton, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import AppTooltip from '../AppTooltip';
import { alpha } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { 
  useThemeActionsContext, 
  useThemeContext 
} from '@crema/context/AppContextProvider/ThemeContextProvider';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { ThemeMode } from '@crema/constants/AppEnums';
import { 
  DarkSidebar, 
  LightSidebar, 
  backgroundDark, 
  backgroundLight, 
  textDark, 
  textLight 
} from '@crema/constants/defaultConfig';

type AppNotificationsProps= {
  drawerPosition?: "left" | "top" | "right" | "bottom";
  tooltipPosition?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  isMenu?: boolean;
  sxNotificationContentStyle?: SxProps<Theme>;
}

const AppThemeSwitcher: React.FC<AppNotificationsProps> = ({
  tooltipPosition = "bottom",
  isMenu = false
}) => {
  const { updateTheme, updateThemeMode } = useThemeActionsContext();
  const { updateSidebarColorSet } = useSidebarActionsContext();
  const { themeMode, theme } = useThemeContext();

  const onModeChange = (event: React.MouseEvent<unknown>) => {
    const mode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    if (mode === ThemeMode.LIGHT) {
      updateSidebarColorSet({
        sidebarBgColor: LightSidebar.sidebarBgColor,
        sidebarTextColor: LightSidebar.sidebarTextColor,
        sidebarMenuSelectedBgColor: LightSidebar.sidebarMenuSelectedBgColor,
        sidebarMenuSelectedTextColor:
          LightSidebar.sidebarMenuSelectedTextColor,
        sidebarHeaderColor: LightSidebar.sidebarHeaderColor,
        mode: 'Light',
      });
    } else {
      updateSidebarColorSet({
        sidebarBgColor: DarkSidebar.sidebarBgColor,
        sidebarTextColor: DarkSidebar.sidebarTextColor,
        sidebarMenuSelectedBgColor: DarkSidebar.sidebarMenuSelectedBgColor,
        sidebarMenuSelectedTextColor:
          DarkSidebar.sidebarMenuSelectedTextColor,
        sidebarHeaderColor: DarkSidebar.sidebarHeaderColor,
        mode: 'Dark',
      });
    }
    updateThemeMode(mode);
    updateTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode: mode,
        background: mode === ThemeMode.DARK ? backgroundDark : backgroundLight,
        text: mode === ThemeMode.DARK ? textDark : textLight
      },
    });
  };

  return (
    <>
      {isMenu ? (
        <Box component="span" onClick={onModeChange}>
          Message
        </Box>
      ) : (
        <AppTooltip title="Mode" placement={tooltipPosition}>
          <IconButton
            className="icon-btn"
            sx={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.default,
              border: 1,
              borderColor: "transparent",
              "&:hover, &:focus": {
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.default, 0.9),
                borderColor: (theme) =>
                  alpha(theme.palette.text.secondary, 0.25),
              },
            }}
            onClick={onModeChange}
            size="large"
          >
            {themeMode === ThemeMode.LIGHT ? <MdDarkMode /> : <MdOutlineLightMode />}
          </IconButton>
        </AppTooltip>
      )}
    </>
  );
};

export default AppThemeSwitcher;
