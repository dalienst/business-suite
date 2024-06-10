/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, Toolbar, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchClients } from "../utils";

function Clients() {
  const { data: session } = useSession();
  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const router = useRouter();

  const [clients, setClients] = useState([]);

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer" + " " + tokens,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    fetchClients(userId, authenticationHeader, setClients);
  }, [session?.user]);

  console.log(clients);

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Clients
        </Typography>
      </Box>
    </>
  );
}

export default Clients;
