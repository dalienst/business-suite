import theme from "@/theme";
import Provider from "./Provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Entreprise Suite</title>
        <meta name="description" content="Manage your business with ease." />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Provider>{children}</Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
