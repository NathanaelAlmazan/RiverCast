import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "@crema/constants/AppEnums";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppCard from "@crema/components/AppCard";
import AppSelect from "@crema/components/AppSelect";
import AppList from "@crema/components/AppList";
import Avatar from "@mui/material/Avatar";
import MixBarChart from "./MixBarChart";
import { sentenceCase } from "change-case";

export type WeatherStateType ={
  id: number;
  amount: string;
  type: string;
  icon: string;
}

export type RiverChartDaumType = {
  name: string;
  Forecast: number;
  Actual: number;
  amt: number;
};

type Props = {
  station: string;
  riverState: WeatherStateType[];
  chartData: RiverChartDaumType[];
  onChangeStation: (station: string) => void;
};
const RiverState = ({ station, riverState = [], chartData, onChangeStation }: Props) => {
  const handleSelectionType = (station: string) => {
    onChangeStation(station);
  };

  const getData = (data: WeatherStateType[]) => {
    return data;
  };

  return (
    <AppCard
      title="Marikina River Level Forecast"
      sxStyle={{ height: 1 }}
      action={
        <AppSelect
          menus={[
            "NANGKA",
            "STO_NINO"
          ]}
          defaultValue={station}
          onChange={handleSelectionType}
        />
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component="p"
          sx={{
            textAlign: { xs: "center", sm: "left" },
            color: "text.secondary",
            mt: -3,
            mb: 2,
          }}
        >
          {`Brgy. ${sentenceCase(station)}`}
        </Box>

        <Box
          sx={{
            mt: "auto",
          }}
        >
          <AppGridContainer>
            <Grid item xs={12} sm={7}>
              <Box
                sx={{
                  width: 1,
                  height: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <MixBarChart data={chartData} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Box
                sx={{
                  width: 1,
                  ml: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <AppList
                  animation="transition.slideRightBigIn"
                  delay={200}
                  duration={400}
                  containerStyle={{ width: "100%", overflow: "hidden" }}
                  data={getData(riverState)}
                  renderRow={(item) => (
                    <Box
                      key={"salesState-" + item.id}
                      sx={{
                        pl: { xl: 6 },
                        py: { xs: 2, md: 4 },
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Avatar
                        src={item.icon}
                        alt="icon"
                        sx={{ height: 35, width: 35, color: "#FFFFFF" }}
                        variant="circular"
                      />

                      <Box
                        position="relative"
                        sx={{
                          ml: 4,
                          overflow: "hidden",
                          width: "calc(100% - 66px)",
                        }}
                      >
                        <Box
                          component="h3"
                          sx={{
                            display: "inline-block",
                            fontWeight: Fonts.MEDIUM,
                            mb: 0.5,
                            fontSize: 16,
                          }}
                        >
                          {item.amount}
                        </Box>
                        <Box
                          component="p"
                          sx={{
                            color: "text.secondary",
                            fontSize: 14,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {item.type}
                        </Box>
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            </Grid>
          </AppGridContainer>
        </Box>
      </Box>
    </AppCard>
  );
};
export default RiverState;
