import { Box, CssBaseline, Stack, Toolbar } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import Appbar from "../Appbar";

function layout({ children }) {
  return (
    <>
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
    </>
  );
}

export default layout;
