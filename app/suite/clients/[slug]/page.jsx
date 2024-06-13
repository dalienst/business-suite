/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { getClientDetail } from "../../utils";
import Link from "next/link";

function ClientDetail({ params: { slug } }) {
  const { data: session } = useSession();
  const [client, setClient] = useState([]);
  const tokens = session?.user?.access;
  const userId = session?.user?.id;

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getClientDetail(userId, slug, authenticationHeader, setClient);
  }, [session?.user]);

  if (!client) {
    return <div>Loading...</div>;
  }

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
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-plus"></i>
                    </button>
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
                            {client?.invoice?.map((invoice) => (
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
                      </div>
                    ) : (
                      <p className="text-center ">No Invoices created</p>
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
                              {client?.contract?.map((contract) => (
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
                        </div>
                      </>
                    ) : (
                      <p className="text-center">No Contracts</p>
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
