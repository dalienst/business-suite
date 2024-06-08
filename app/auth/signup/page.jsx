/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
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

function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
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
            Let's Get Started
          </Typography>

          <Box>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegistrationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  await signUpUser(values);
                  router.push("/auth/login");
                } catch (error) {
                  setLoading(false);
                }
              }}
            >
              {({ touched }) => (
                <Form style={{ marginTop: "1rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as="input"
                        type="text"
                        name="first_name"
                        className="text-input"
                        placeholder="First Name"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="input-error"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as="input"
                        type="text"
                        name="last_name"
                        className="text-input"
                        placeholder="Last Name"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="input-error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as="input"
                        type="email"
                        name="email"
                        className="text-input"
                        placeholder="Email Address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="input-error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as="input"
                        type="text"
                        name="username"
                        className="text-input"
                        placeholder="Username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="input-error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as="input"
                        type="password"
                        name="password"
                        className="text-input"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="input-error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as="input"
                        type="password"
                        name="confirmPassword"
                        className="text-input"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
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
                      <>Sign Up</>
                    )}
                  </Button>
                  <Grid container justifyContent="flex-start">
                    <Grid item>
                      <Link href="/auth/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
