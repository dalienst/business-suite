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
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Divider,
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

  const clients = person?.clients?.slice(0, 10);
  const contracts = person?.contracts;

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

        <Typography variant="h5" gutterBottom sx={{ marginTop: "2rem" }}>
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Start Date</TableCell>
                    <TableCell align="right">End Date</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper>
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h5">Clients</Typography>
                <Button
                  href="/suite/clients"
                  variant="outlined"
                  size="small"
                  sx={{ ml: "auto" }}
                >
                  View All
                </Button>
              </Toolbar>
              <Divider />
              {clients?.map((client) => (
                <Box
                  key={client?.id}
                  sx={{ padding: 2, borderBottom: "1px solid #e0e0e0" }}
                >
                  <Typography variant="h6">{client?.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {client?.email}
                  </Typography>
                </Box>
              ))}
            </Paper>
            {/* <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Client</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
