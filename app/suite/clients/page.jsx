/* eslint-disable react-hooks/exhaustive-deps */
// components/Clients.jsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { fetchClients } from "../utils";
import { urlActions } from "@/app/tools/api";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function Clients() {
  const { data: session } = useSession();
  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClientId, setLoadingClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "application/json",
    },
  };

  const handleDelete = async (slug) => {
    setLoading(true);
    setLoadingClientId(slug);
    try {
      await urlActions.delete(`clients/${slug}/`, authenticationHeader);
      setClients((prevClients) =>
        prevClients.filter((client) => client.slug !== slug)
      );
    } catch (error) {
      console.error("Failed to delete client:", error);
    } finally {
      setLoading(false);
      setLoadingClientId(null);
    }
  };

  useEffect(() => {
    fetchClients(userId, authenticationHeader, setClients);
  }, [session?.user]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container py-3">
          <h4>Clients</h4>
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Clients</h6>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleShow}
              >
                <i className="bi bi-plus-circle me-2"></i>Add
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Details</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <Suspense fallback={<div>Fetching Data...</div>}>
                    <tbody>
                      {(rowsPerPage > 0
                        ? clients.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : clients
                      ).map((client) => (
                        <tr key={client.id}>
                          <td>
                            <div className="fw-bold">{client.name}</div>
                          </td>
                          <td className="text-end">
                            <button className="btn btn-outline-secondary btn-sm me-2">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(client?.slug)}
                              disabled={loading}
                            >
                              {loading && loadingClientId === client?.slug ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                <i className="bi bi-trash"></i>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {emptyRows > 0 && (
                        <tr style={{ height: 53 * emptyRows }}>
                          <td colSpan={2} />
                        </tr>
                      )}
                    </tbody>
                  </Suspense>
                </table>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div>
                <select
                  className="form-select form-select-sm"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  aria-label="Rows per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handleChangePage(0)}
                      aria-label="First"
                    >
                      <span aria-hidden="true">&laquo;&laquo;</span>
                    </button>
                  </li>
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handleChangePage(page - 1)}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      page >= Math.ceil(clients.length / rowsPerPage) - 1
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handleChangePage(page + 1)}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      page >= Math.ceil(clients.length / rowsPerPage) - 1
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        handleChangePage(
                          Math.max(
                            0,
                            Math.ceil(clients.length / rowsPerPage) - 1
                          )
                        )
                      }
                      aria-label="Last"
                    >
                      <span aria-hidden="true">&raquo;&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Modal for creating new clients */}
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-dialog-centered"
          >
            <div className="modal-header">
              <h5 className="modal-title">Create New Client</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  const formData = new FormData(e.target);
                  const values = Object.fromEntries(formData.entries());
                  try {
                    await urlActions.post(
                      `/clients/`,
                      values,
                      authenticationHeader
                    );
                    toast.success("Client Added Successfully!");
                    setLoading(false);
                    handleClose();
                    window.location.reload();
                  } catch (error) {
                    toast.error("Failed to Add Client!");
                    setLoading(false);
                  }
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Add Client"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </Suspense>
    </>
  );
}

export default Clients;
