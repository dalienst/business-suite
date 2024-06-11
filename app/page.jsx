"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { Suspense } from "react";

function Splash() {
  const { data: session } = useSession();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="container-fluid p-0 d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: "100vh" }}
      >
        <h1 className="display-1">Enterprise Suite</h1>
        <p className="lead">Manage your business with ease.</p>
        {session?.user ? (
          <Link className="btn btn-outline-primary" href="/suite/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link className="btn btn-outline-primary" href="/auth/login">
            Get Started
          </Link>
        )}
      </div>
    </Suspense>

    // <Stack
    //   sx={{
    //     height: "100vh",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     textAlign: "center",
    //     flex: 1,
    //   }}
    // >
    //   <Typography variant="h3" gutterBottom>
    //     Business Suite
    //   </Typography>
    //   <Typography variant="h5" gutterBottom>
    //     Manage your business with ease.
    //   </Typography>

    //   {session?.user ? (
    //     <Button
    //       variant="outlined"
    //       href="/suite/dashboard"
    //       endIcon={<Dashboard />}
    //     >
    //       Dashboard
    //     </Button>
    //   ) : (
    //     <Button variant="outlined" href="/auth/login" endIcon={<ArrowRight />}>
    //       Get Started
    //     </Button>
    //   )}
    // </Stack>
  );
}

export default Splash;
