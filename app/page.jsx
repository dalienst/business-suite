"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { Suspense } from "react";

function Splash() {
  const { data: session } = useSession();
  return (
    <div
      className="container-fluid p-0 d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "100vh" }}
    >
      <h1 className="display-1">Enterprise Suite</h1>
      <p className="lead">Manage your business with ease.</p>
      <Link className="btn btn-outline-primary" href="/auth/login">
        Get Started
      </Link>
      {/* {session?.user ? (
          <Link className="btn btn-outline-primary" href="/suite/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link className="btn btn-outline-primary" href="/auth/login">
            Get Started
          </Link>
        )} */}
    </div>
  );
}

export default Splash;
