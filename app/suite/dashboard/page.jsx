/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { urlActions } from "@/app/tools/api";
import Link from "next/link";

function Dashboard() {
  const { data: session } = useSession();

  const [person, setPerson] = useState([]);
  const tokens = session?.user?.access;
  const userId = session?.user?.id;

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer" + " " + tokens,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    const getPerson = async () => {
      if (!session?.user?.id) {
        return;
      }

      try {
        const response = await urlActions.get(
          `/users/${userId}/`,
          authenticationHeader
        );

        setPerson(response?.data);
      } catch (error) {}
    };

    getPerson();
  }, [session?.user]);

  console.log(person);

  const clientsCount = person?.clients?.length;
  const contractsCount = person?.contracts?.length;
  const paymentMethodsCount = person?.payment_methods?.length;

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome, {session?.user?.first_name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" elevation={1} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5">Clients</Typography>
                <Typography variant="h4">{clientsCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card variant="outlined" elevation={1} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5">Contracts</Typography>
                <Typography variant="h4">{contractsCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card variant="outlined" elevation={1} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5">Payment Methods</Typography>
                <Typography variant="h4">{paymentMethodsCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
