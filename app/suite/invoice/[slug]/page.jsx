/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { getInvoiceDetail } from "../../utils";
import Link from "next/link";

function InvoiceDetail({ params: { slug } }) {
  const { data: session } = useSession();
  const [invoice, setInvoice] = useState(null);
  const tokens = session?.user?.access;
  const userId = session?.user?.id;

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
  }, [session?.user]);

  if (!invoice) {
    return <div>Getting your invoice...</div>;
  }

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
          <div className="d-flex justify-content-between align-items-center">
            <h4>{invoice?.title}</h4>
            <button type="button" className="btn btn-outline-primary btn-sm">
              Add Item
            </button>
          </div>

          <div className="row mt-3">
            <div className="col-md-8 col-sm-12 mb-3">
              <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6>Invoice Details</h6>
                  {invoice.status === "pending" ? (
                    <span className="badge bg-danger">Pending</span>
                  ) : (
                    <span className="badge bg-success">Paid</span>
                  )}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>To:</strong> {invoice.client}
                  </p>
                  <p className="card-text">
                    <strong>From:</strong> {session?.user?.name}
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
                </div>
              </div>
            </div>

            <div className="col-md-8 col-sm-12 mt-3">
              <div className="card shadow">
                <div className="card-header">
                  <h6>Invoice Items</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item) => (
                          <tr key={item.id}>
                            <td>{item?.description}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.unit_price}</td>
                            <td>{item?.total_price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default InvoiceDetail;