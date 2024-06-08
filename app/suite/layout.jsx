import { Box, CssBaseline, Stack, Toolbar } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";

function layout({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default layout;
