/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getInvoiceDetail } from "../../utils";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { Form, Formik } from "formik";
import { urlActions } from "@/app/tools/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function InvoiceDetail({ params: { slug } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const tokens = session?.user?.access;
  const userId = session?.user?.id;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (userId && slug) {
      getInvoiceDetail(userId, slug, authenticationHeader, setInvoice);
    }
  }, [session?.user, slug, userId]);

  if (!invoice) {
    return <div>Getting your invoice...</div>;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await urlActions.delete(`invoice/${slug}/`, authenticationHeader);
      toast.success("Invoice deleted successfully");
      router.push("/suite/clients");
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      toast.error("Failed to delete invoice!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (itemSlug) => {
    setLoadingItemId(itemSlug);
    setLoading(true);
    try {
      await urlActions.delete(
        `invoices/${invoice.slug}/items/${itemSlug}/`,
        authenticationHeader
      );
      toast.success("Item deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item!");
    } finally {
      setLoading(false);
      setLoadingItemId(null);
    }
  };

  return (
    <>
      <div className="container px-0 py-1">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/suite/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/suite/clients">Clients</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link href={`/suite/clients/${invoice?.client}`}>Client</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {invoice?.title}
            </li>
          </ol>
        </nav>
        <section>
          <h4>{invoice?.title}</h4>

          <div className="row mt-3">
            <div className="col-md-8 col-sm-12 mb-3">
              <div className="card shadow">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h6>Invoice Details</h6>
                  {invoice.status === "pending" ? (
                    <span className="badge bg-danger">Pending</span>
                  ) : (
                    <span className="badge bg-success">Paid</span>
                  )}
                </div>
                <div className="card-body">
                  <div className="mb-3 w-100 d-flex justify-content-end align-items-center gap-2">
                    <button
                      onClick={handleShow}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Add Item
                    </button>
                    <button className="btn btn-sm btn-outline-info">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-success">
                      <i className="bi bi-send"></i>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-sm btn-outline-danger"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <i className="bi bi-trash"></i>
                      )}
                    </button>
                  </div>

                  <p className="card-text">
                    <strong>To:</strong> {invoice.client}
                  </p>
                  <p className="card-text">
                    <strong>From:</strong> {session?.user?.first_name}{" "}
                    {session?.user?.last_name}
                  </p>
                  <p className="card-text">
                    <strong>Issue Date:</strong> {invoice.issue_date}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong> {invoice.due_date}
                  </p>
                  <p className="card-text">
                    <strong>Total Amount:</strong> {invoice.total_amount}
                  </p>

                  <hr className="w-100" />

                  <section>
                    <h6 className="card-title">Invoice Items</h6>

                    {invoice?.items?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit Price</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.items.map((item) => (
                              <tr key={item.id}>
                                <td>{item?.description}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.unit_price}</td>
                                <td>{item?.total_price}</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      handleDeleteItem(item.item_slug)
                                    }
                                    className="btn btn-outline-danger btn-sm"
                                    disabled={
                                      loading && loadingItemId === item.id
                                    }
                                  >
                                    {loading && loadingItemId === item.id ? (
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
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="card-text text-center text-bg-info rounded p-2">
                        No invoice items found. Add items to your invoice
                      </p>
                    )}
                  </section>
                </div>
              </div>
            </div>

            {/* Modal to add invoice items */}
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-dialog-centered"
            >
              <div className="modal-header">
                <h5 className="modal-title">Add Invoice Item</h5>
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
                    description: "",
                    quantity: "",
                    unit_price: "",
                    invoice: invoice?.slug,
                  }}
                  onSubmit={async (values) => {
                    setLoading(true);
                    try {
                      await urlActions?.post(
                        `invoices/${invoice?.slug}/items/`,
                        values,
                        authenticationHeader
                      );
                      toast.success("Invoice Item Added Successfully!");
                      setLoading(false);
                      handleClose();
                      window.location.reload();
                    } catch (error) {
                      toast.error("Failed to Add Invoice Item!");
                      setLoading(false);
                    }
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          required
                          onChange={(e) =>
                            setFieldValue("description", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                          Quantity
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          required
                          onChange={(e) =>
                            setFieldValue("quantity", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="unit_price" className="form-label">
                          Unit Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="unit_price"
                          name="unit_price"
                          required
                          onChange={(e) =>
                            setFieldValue("unit_price", e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
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
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </>
  );
}

export default InvoiceDetail;
