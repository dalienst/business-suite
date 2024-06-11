"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Provider from "./Provider";
import "./globals.css";
import BootstrapClient from "./BootstrapClient";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Enterprise Suite</title>
        <meta name="description" content="Manage your business with ease." />
      </head>
      <body className="body">
        <Toaster position="top-right" />
        <Provider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <BootstrapClient />
        </Provider>
      </body>
    </html>
  );
}
