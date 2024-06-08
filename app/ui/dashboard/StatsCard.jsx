import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, count }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3">{count}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
