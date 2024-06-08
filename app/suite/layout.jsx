import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";

function layout({ children }) {
  return (
    <>
      <Stack>
        <Navbar />
        {children}
      </Stack>
    </>
  );
}

export default layout;
