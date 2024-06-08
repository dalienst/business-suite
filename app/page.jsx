import { ArrowRight } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

function page() {
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flex: 1,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Business Suite
      </Typography>
      <Typography variant="h5" gutterBottom>
        Manage your business with ease.
      </Typography>
      <Button variant="outlined" href="/auth/login" endIcon={<ArrowRight />}>
        Get Started
      </Button>
    </Stack>
  );
}

export default page;
