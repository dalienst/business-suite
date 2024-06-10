/* eslint-disable react-hooks/exhaustive-deps */
// components/Clients.jsx

"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchClients } from "../utils";
import {
  Add,
  Delete,
  Edit,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Clients() {
  const { data: session } = useSession();
  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetchClients(userId, authenticationHeader, setClients);
  }, [session?.user]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Clients
        </Typography>

        <Paper elevation={1} sx={{ width: "100%" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Clients</Typography>
            <Button
              href="/suite/clients"
              variant="outlined"
              size="small"
              sx={{ ml: "auto" }}
              endIcon={<Add />}
            >
              Add
            </Button>
          </Toolbar>
          <Divider />
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead sx={{ bgcolor: "#f5f5f5", borderBottom: 1 }}>
                <TableRow>
                  <TableCell>Details</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? clients.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : clients
                ).map((client) => (
                  <TableRow
                    key={client.id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell>
                        <Typography variant="body1">{client.name}</Typography>
                      {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" color="textSecondary">
                          {client.email}
                        </Typography>
                      </Box> */}
                    </TableCell>

                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton aria-label="edit">
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={clients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default Clients;
