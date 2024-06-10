"use client";

import { ArrowRight, Dashboard } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

function Splash() {
  const { data: session } = useSession();
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

      {session?.user ? (
        <Button
          variant="outlined"
          href="/suite/dashboard"
          endIcon={<Dashboard />}
        >
          Dashboard
        </Button>
      ) : (
        <Button variant="outlined" href="/auth/login" endIcon={<ArrowRight />}>
          Get Started
        </Button>
      )}
    </Stack>
  );
}

export default Splash;
