/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { urlActions } from "@/app/tools/api";
import { fetchUserData } from "../utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./settings.css";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";

function Settings() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);

  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const router = useRouter();

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer" + " " + tokens,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUserData(userId, authenticationHeader, setPerson);
  }, [session?.user]);

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "start" }} gutterBottom>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            elevation={1}
            sx={{
              height: "100%",
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              {person?.avatar ? (
                <Image
                  src={person?.avatar}
                  alt="avatar"
                  width={80}
                  height={80}
                  priority={true}
                  unoptimized
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    borderColor: "black",
                  }}
                />
              ) : (
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={80}
                  height={80}
                  priority={true}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    borderColor: "black",
                  }}
                />
              )}
              <Typography
                variant="h6"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                Personal Details
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">
                  <strong>Username:</strong> {person?.username}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {person?.email}
                </Typography>
                <Typography variant="body1">
                  <strong>First Name:</strong> {person?.first_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {person?.last_name}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ textAlign: "start" }}>
              <Button variant="outlined" onClick={handleClickOpen} size="small">
                Update
              </Button>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <Close />
                </IconButton>
                <DialogContent>
                  <DialogContentText>
                    To update your profile, please fill out the form below.
                  </DialogContentText>
                  <Formik
                    initialValues={{
                      avatar: null,
                      first_name: person?.first_name,
                      last_name: person?.last_name,
                    }}
                    onSubmit={async (values) => {
                      setLoading(true);
                      try {
                        const formData = new FormData();
                        if (values?.avatar) {
                          formData.append("avatar", values?.avatar);
                        }
                        formData.append("first_name", values?.first_name);
                        formData.append("last_name", values?.last_name);

                        await urlActions.patch(
                          `/users/${userId}/`,
                          formData,
                          authenticationHeader
                        );
                        setLoading(false);
                        handleClose();
                        router.reload();
                      } catch (error) {
                        console.error("Update failed", error);
                        setLoading(false);
                      }
                    }}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <Box sx={{ marginBottom: 2 }}>
                          <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={(e) =>
                              setFieldValue("avatar", e.target.files[0])
                            }
                            style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                          <Field
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Enter your first name"
                            style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                          <Field
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Enter your last name"
                            style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Box>
                          <Button
                            type="submit"
                            size="small"
                            variant="outlined"
                            disabled={loading}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            {loading ? (
                              <CircularProgress
                                size={24}
                                sx={{ color: "#000", marginRight: 1 }}
                              />
                            ) : (
                              "Update"
                            )}
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </DialogContent>
              </Dialog>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
