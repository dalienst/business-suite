/* eslint-disable react/no-unescaped-entities */
"use client";

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
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/app/validationSchema";
import { signIn } from "next-auth/react";
import "./page.css";
import Link from "next/link";

function Login() {
  const [loading, setLoading] = useState(false);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          px: { sm: 4, xs: 2 },
          py: { sm: 8, xs: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          src="/blackcircle.svg"
          className="mx-auto"
          alt="logo"
          width={60}
          height={60}
          priority={true}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Welcome Back
        </Typography>

        <Box>
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: true,
                  callbackUrl: "/suite/dashboard",
                });
                setLoading(false);
              } catch (error) {}
            }}
          >
            {({ touched }) => (
              <Form autoComplete="on" style={{ marginTop: "1rem" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      className="text-input"
                    />
                    <ErrorMessage
                      component="p"
                      name="email"
                      className="input-error"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      className="text-input"
                    />
                    <ErrorMessage
                      component="p"
                      name="password"
                      className="input-error"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <CircularProgress sx={{ color: "#000" }} />
                    </>
                  ) : (
                    <>Sign In</>
                  )}
                </Button>
                <Grid container justifyContent="flex-start">
                  <Grid item>
                    <Link href="/auth/signup" variant="body2">
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
