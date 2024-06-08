"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Toolbar, Typography, Box } from "@mui/material";

function Dashboard() {
  const { data: session } = useSession();

  return <Typography>Welcome, {session?.user?.first_name}</Typography>;
}

export default Dashboard;
