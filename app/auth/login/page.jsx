/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/app/validationSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Login Failed");
    } else {
      toast.success("Login Successful! Redirecting...");
      router.push("/suite/dashboard");
    }

    setLoading(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="container-fluid d-flex justify-content-center flex-column align-items-center"
        style={{ height: "100vh" }}
      >
        <form className="shadow bg-white px-3 py-4">
          <Image
            src="/blackcircle.svg"
            className="mx-auto d-block"
            alt="logo"
            width={60}
            height={60}
            priority
          />
          <h2 className="mt-2 text-center">Welcome Back | Login</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-outline-primary btn-sm"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </Suspense>
  );
}

export default Login;
