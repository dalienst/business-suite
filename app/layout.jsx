"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import theme from "@/theme";
import Provider from "./Provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";
import BootstrapClient from "./BootstrapClient";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Enterprise Suite</title>
        <meta name="description" content="Manage your business with ease." />
      </head>
      <body className="body">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <Provider>
              {children}
              <BootstrapClient />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
