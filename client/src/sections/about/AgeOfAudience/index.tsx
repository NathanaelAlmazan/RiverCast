import React from "react";
import AudienceChart from "./AudienceChart";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AudienceCell from "./AudienceCell";
import AppList from "@crema/components/AppList";
import { AgeOfAudienceType } from "@crema/types/models/dashboards/Ecommerce";

type Props = {
  audienceData: AgeOfAudienceType[];
};

const AgeOfAudience = ({ audienceData }: Props) => {
  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography component="div" variant="h4" align="center" sx={{ paddingTop: 3 }}>
        Feature Importance
      </Typography>

      <Box
        sx={{
          padding: "8px 12px",
        }}
      >
        <AudienceChart audienceData={audienceData} />
      </Box>

      <AppList
        data={audienceData}
        renderRow={(audience) => (
          <AudienceCell key={"audience-" + audience.id} audience={audience} />
        )}
      />
    </Box>
  );
};

export default AgeOfAudience;

AgeOfAudience.propTypes = {
  audienceData: PropTypes.array,
};
