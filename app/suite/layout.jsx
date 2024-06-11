import { Box, CssBaseline, Stack, Toolbar } from "@mui/material";
import React, { Suspense } from "react";
import Appbar from "../Appbar";

function layout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="d-flex">
        <Appbar />
        <div className="d-flex flex-grow-1">
          <main
            className="flex-grow-1 p-3"
            style={{ width: "calc(100% - 240px)" }}
          >
            <div className="toolbar" style={{ height: "56px" }}></div>
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  );
}

export default layout;
