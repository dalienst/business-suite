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
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      passwordRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="container-fluid d-flex justify-content-center flex-column align-items-center"
        style={{ height: "100vh" }}
      >
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
              });

              if (result?.error) {
                toast.error("Login Failed");
              } else {
                toast.success("Login Successful! Redirecting...");
                router.push("/suite/dashboard");
              }

              setLoading(false);
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
                <h2 className="mt-2 text-center">Welcome Back | Login</h2>
                <div className="row">
                  <div className="col-md-12 col-sm-12 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="email"
                      name="email"
                      id="email"
                    />
                    <ErrorMessage
                      component="p"
                      name="email"
                      className="text-danger fst-italic"
                    />
                  </div>
                  <div className="col-md-12 col-sm-12 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      className="form-control rounded-0"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <ErrorMessage
                      component="p"
                      name="password"
                      className="text-danger fst-italic"
                    />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-outline-primary rounded-0"
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
                </div>
                <div className="mb-3 mt-3">
                  <Link href="/auth/signup">Create Account</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Suspense>
  );
}

export default Login;
