/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { getClientDetail } from "../../utils";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Link from "next/link";
import { urlActions } from "@/app/tools/api";
import { Form, Formik } from "formik";

function ClientDetail({ params: { slug } }) {
  const { data: session } = useSession();
  const [client, setClient] = useState(null);
  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pageInvoices, setPageInvoices] = useState(0);
  const [rowsPerPageInvoices, setRowsPerPageInvoices] = useState(5);

  const [pageContracts, setPageContracts] = useState(0);
  const [rowsPerPageContracts, setRowsPerPageContracts] = useState(5);

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (userId && slug) {
      getClientDetail(userId, slug, authenticationHeader, setClient);
    }
  }, [session?.user]);

  if (!client) {
    return <div>Loading...</div>;
  }

  const handleChangePageInvoices = (newPage) => {
    setPageInvoices(newPage);
  };

  const handleChangeRowsPerPageInvoices = (event) => {
    setRowsPerPageInvoices(parseInt(event.target.value, 10));
    setPageInvoices(0);
  };

  const handleChangePageContracts = (newPage) => {
    setPageContracts(newPage);
  };

  const handleChangeRowsPerPageContracts = (event) => {
    setRowsPerPageContracts(parseInt(event.target.value, 10));
    setPageContracts(0);
  };

  const renderPagination = (
    page,
    rowsPerPage,
    dataLength,
    handleChangePage
  ) => (
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
            page >= Math.ceil(dataLength / rowsPerPage) - 1 ? "disabled" : ""
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
            page >= Math.ceil(dataLength / rowsPerPage) - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              handleChangePage(
                Math.max(0, Math.ceil(dataLength / rowsPerPage) - 1)
              )
            }
            aria-label="Last"
          >
            <span aria-hidden="true">&raquo;&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );

  const invoicesToDisplay = client?.invoice?.slice(
    pageInvoices * rowsPerPageInvoices,
    pageInvoices * rowsPerPageInvoices + rowsPerPageInvoices
  );

  const contractsToDisplay = client?.contract?.slice(
    pageContracts * rowsPerPageContracts,
    pageContracts * rowsPerPageContracts + rowsPerPageContracts
  );

  return (
    <>
      <Suspense fallback={<div>Getting you there ...</div>}>
        <div className="container px-0 py-1">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/suite/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/suite/clients">Clients</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {client?.name}
              </li>
            </ol>
          </nav>
          <h4>Client Details</h4>
          <section className="py-3">
            <div className="row">
              <div className="col-md-5 col-sm-12 mb-3">
                <div className="card shadow">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>Invoices</h5>
                    <button
                      type="button"
                      onClick={handleShow}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-plus"></i>
                    </button>

                    <Modal
                      show={show}
                      onHide={handleClose}
                      dialogClassName="modal-dialog-centered"
                    >
                      <div className="modal-header">
                        <h5 className="modal-title">Create Invoice Template</h5>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={handleClose}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <Formik
                          initialValues={{
                            title: "",
                            issue_date: "",
                            due_date: "",
                            client: client?.slug,
                          }}
                          onSubmit={async (values) => {
                            setLoading(true);
                            try {
                              await urlActions?.post(
                                `/invoices/`,
                                values,
                                authenticationHeader
                              );
                              toast.success("Invoice Added Successfully!");
                              setLoading(false);
                              handleClose();
                              window.location.reload();
                            } catch (error) {
                              toast.error("Failed to Add Invoice!");
                              setLoading(false);
                            }
                          }}
                        >
                          {({ setFieldValue }) => (
                            <Form>
                              <p>
                                You will be able to add items to this invoice
                                later
                              </p>
                              <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  name="title"
                                  required
                                  onChange={(e) =>
                                    setFieldValue("title", e.target.value)
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="issue_date"
                                  className="form-label"
                                >
                                  Issue Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="issue_date"
                                  name="issue_date"
                                  required
                                  onChange={(e) =>
                                    setFieldValue("issue_date", e.target.value)
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="due_date"
                                  className="form-label"
                                >
                                  Due Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="due_date"
                                  name="due_date"
                                  required
                                  onChange={(e) =>
                                    setFieldValue("due_date", e.target.value)
                                  }
                                />
                              </div>
                              <button type="submit" className="btn btn-success">
                                {loading ? (
                                  <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </Form>
                          )}
                        </Formik>
                        {/* <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            const formData = new FormData(e.target);
                            const values = Object.fromEntries(formData);
                            try {
                              await urlActions?.post(
                                `/invoices/`,
                                values,
                                authenticationHeader
                              );
                              toast.success("Invoice Added Successfully!");
                              setLoading(false);
                              handleClose();
                              window.location.reload();
                            } catch (error) {
                              toast.error("Failed to Add Invoice!");
                              setLoading(false);
                            }
                          }}
                        ></form> */}
                      </div>
                    </Modal>
                  </div>
                  <div className="card-body p-0">
                    {client?.invoice?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Amount</th>
                              <th>Due Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoicesToDisplay.map((invoice) => (
                              <tr key={invoice.id}>
                                <td>
                                  <Link href="#">{invoice.title}</Link>
                                </td>
                                <td>{invoice.total_amount}</td>
                                <td>
                                  {new Date(
                                    invoice.due_date
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  {invoice.status === "pending" ? (
                                    <span className="badge bg-danger">
                                      Pending
                                    </span>
                                  ) : (
                                    <span className="badge bg-success">
                                      Completed
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                          <div>
                            <select
                              className="form-select form-select-sm"
                              value={rowsPerPageInvoices}
                              onChange={handleChangeRowsPerPageInvoices}
                              aria-label="Rows per page"
                            >
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                            </select>
                          </div>
                          {renderPagination(
                            pageInvoices,
                            rowsPerPageInvoices,
                            client.invoice.length,
                            handleChangePageInvoices
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-center">No Invoices created</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-sm-12 mb-3">
                <div className="card shadow">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>Contracts</h5>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <div className="card-body p-0">
                    {client?.contract?.length > 0 ? (
                      <>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contractsToDisplay.map((contract) => (
                                <tr key={contract.id}>
                                  <td>
                                    <Link href="#">{contract.name}</Link>
                                  </td>
                                  <td>
                                    {new Date(
                                      contract.start_date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {new Date(
                                      contract.end_date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {contract.status === "pending" ? (
                                      <span className="badge bg-warning">
                                        Pending
                                      </span>
                                    ) : (
                                      <span className="badge bg-success">
                                        Completed
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="card-footer d-flex justify-content-between align-items-center">
                            <div>
                              <select
                                className="form-select form-select-sm"
                                value={rowsPerPageContracts}
                                onChange={handleChangeRowsPerPageContracts}
                                aria-label="Rows per page"
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                              </select>
                            </div>
                            {renderPagination(
                              pageContracts,
                              rowsPerPageContracts,
                              client.contract.length,
                              handleChangePageContracts
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-center">No Contracts created</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}

export default ClientDetail;
