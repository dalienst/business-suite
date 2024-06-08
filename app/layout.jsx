"use client";

import theme from "@/theme";
import Provider from "./Provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";

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
            <Provider>{children}</Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
