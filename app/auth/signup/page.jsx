/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { Suspense, useState } from "react";
import "./signup.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegistrationSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/tools/api";
import toast from "react-hot-toast";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div
          className="container-fluid d-flex justify-content-center flex-column align-items-center"
          style={{ height: "100vh" }}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              first_name: "",
              last_name: "",
              confirmPassword: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await signUpUser(values);
                router.push("/auth/login");
                toast.success("Registration Successful! Redirecting...");
              } catch (error) {
                if (
                  error?.response?.data?.email[0] ||
                  error?.response?.data?.username[0]
                ) {
                  toast.error("User already exists");
                } else {
                  toast.error("Registration Failed");
                }
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ touched }) => (
              <Form className="bg-white shadow py-5 px-3">
                <Image
                  src="/blackcircle.svg"
                  className="mx-auto d-block"
                  alt="logo"
                  width={60}
                  height={60}
                  priority
                />
                <h2 className="mt-2 text-center">
                  Get Started | Create an Account
                </h2>
                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="first_name" className="form-label">
                      First Name
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="text"
                      name="first_name"
                    />
                    <ErrorMessage
                      component="p"
                      name="first_name"
                      className="text-danger fst-italic"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="text"
                      name="last_name"
                    />
                    <ErrorMessage
                      component="p"
                      name="last_name"
                      className="text-danger fst-italic"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="email"
                      name="email"
                    />
                    <ErrorMessage
                      component="p"
                      name="email"
                      className="text-danger fst-italic"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="text"
                      name="username"
                    />
                    <ErrorMessage
                      component="p"
                      name="username"
                      className="text-danger fst-italic"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage
                      component="p"
                      name="password"
                      className="text-danger fst-italic"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="password"
                      name="confirmPassword"
                    />
                    <ErrorMessage
                      component="p"
                      name="confirmPassword"
                      className="text-danger fst-italic"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-outline-primary w-100  rounded-0"
                  >
                    {loading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                <div className="mb-3">
                  <Link href="/auth/login">Already have an account? Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Suspense>
    </>
  );
}

export default SignUp;
