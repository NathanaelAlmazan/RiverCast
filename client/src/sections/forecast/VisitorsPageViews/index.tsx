import React from "react";
import Box from "@mui/material/Box";
import StatGraphs from "./StatGraphs";
import { alpha, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppCard from "@crema/components/AppCard";
import AppSelect from "@crema/components/AppSelect";
import { sentenceCase } from "change-case";

const VisitorCard = styled(AppCard)(({ theme }) => {
  return {
    height: "100%",
    "& .MuiCardHeader-root": {
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
      },
    },
  };
});
const VisitorAction = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      flexDirection: "row",
    },
    "& .visitor-action-view": {
      display: "none",
      alignItems: "center",
      flexWrap: "wrap",
      marginRight: 10,
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    "& .visitor-action-item": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      lineHeight: 1,
      paddingBottom: 2,
      "&:not(:first-of-type)": {
        borderLeft: `solid 1px ${alpha(theme.palette.text.secondary, 0.2)}`,
        marginLeft: 16,
        paddingLeft: 16,
      },
    },
    "& .dot-visitor": {
      height: 10,
      width: 10,
      marginRight: 4,
      borderRadius: "50%",
    },
  };
});

export type ForecastActualType = {
  Datetime: string;
  Forecast: number;
  Actual: number;
};

type Props = {
  station: string;
  data: ForecastActualType[];
  onChangeYear: (year: number) => void;
};
const VisitorsPageViews = ({ station, data = [], onChangeYear }: Props) => {
  const theme = useTheme();
  const handleSelectionType = (data: string) => {
    onChangeYear(parseInt(data));
  };

  return (
    <VisitorCard
      title="Marikina River Level History"
      action={
        <VisitorAction>
          <div className="visitor-action-view">
            <div className="visitor-action-item">
              <span
                className="dot-visitor"
                style={{ backgroundColor: theme.palette.primary.main }}
              />
              Forecast
            </div>
            <div className="visitor-action-item">
              <span
                className="dot-visitor"
                style={{ backgroundColor: theme.palette.secondary.main }}
              />
              Actual
            </div>
          </div>
          <AppSelect
            menus={[
              "2021",
              "2022",
              "2023"
            ]}
            defaultValue="2023"
            onChange={handleSelectionType}
          />
        </VisitorAction>
      }
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
      <StatGraphs data={data} />
    </VisitorCard>
  );
};
export default VisitorsPageViews;
