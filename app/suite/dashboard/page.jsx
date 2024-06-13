/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { fetchUser } from "../utils";

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
    fetchUser(userId, authenticationHeader, setPerson);
  }, [session?.user]);

  const clients = person?.clients?.slice(0, 10);
  const contracts = person?.contracts?.slice(0, 10);

  const clientsCount = person?.clients?.length;
  const contractsCount = person?.contracts?.length;
  const paymentMethodsCount = person?.payment_methods?.length;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container py-5">
        <h4 className="mb-4">Welcome, {session?.user?.first_name}</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Clients</h5>
                <h4 className="card-text">{clientsCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Contracts</h5>
                <h4 className="card-text">{contractsCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Payment Methods</h5>
                <h4 className="card-text">{paymentMethodsCount}</h4>
              </div>
            </div>
          </div>
        </div>

        <h5 className="mt-4 mb-3">Summary</h5>
        <div className="row">
          <div className="col-lg-8 mb-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Contracts</h6>
                <a
                  href="/suite/clients"
                  className="btn btn-outline-secondary btn-sm"
                >
                  View All
                </a>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col" className="text-end">
                        Start Date
                      </th>
                      <th scope="col" className="text-end">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts?.map((contract) => (
                      <tr key={contract?.id}>
                        <td>{contract?.name}</td>
                        <td className="text-end">{contract?.start_date}</td>
                        <td className="text-end">{contract?.end_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-3">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Clients</h6>
                <a
                  href="/suite/clients"
                  className="btn btn-outline-secondary btn-sm"
                >
                  View All
                </a>
              </div>
              <div className="list-group list-group-flush">
                {clients?.map((client) => (
                  <div className="list-group-item" key={client?.id}>
                    <h6 className="mb-0">{client?.name}</h6>
                    <small className="text-muted">{client?.email}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Dashboard;
