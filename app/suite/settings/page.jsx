/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { urlActions } from "@/app/tools/api";
import { fetchUserData } from "../utils";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import "./settings.css";
import { Field, Form, Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Settings() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);

  const tokens = session?.user?.access;
  const userId = session?.user?.id;

  const authenticationHeader = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchUserData(userId, authenticationHeader, setPerson);
  }, [session?.user]);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Account Settings</h4>
      <div className="row">
        <div className="col-md-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Card className="h-100">
              <Card.Body>
                {person?.avatar ? (
                  <Image
                    src={person?.avatar}
                    alt="avatar"
                    width={80}
                    height={80}
                    priority={true}
                    unoptimized
                    className="rounded-circle"
                    style={{ objectFit: "cover", borderColor: "black" }}
                  />
                ) : (
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={80}
                    height={80}
                    priority={true}
                    className="rounded-circle"
                    style={{ objectFit: "cover", borderColor: "black" }}
                  />
                )}
                <h6 className="mt-3 font-weight-bold">Personal Details</h6>
                <div className="mt-2">
                  <p>
                    <strong>Username:</strong> {person?.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {person?.email}
                  </p>
                  <p>
                    <strong>First Name:</strong> {person?.first_name}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {person?.last_name}
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleShow}
                >
                  Update
                </Button>
              </Card.Footer>
            </Card>
          </Suspense>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>To update your profile, please fill out the form below.</p>
          <Formik
            initialValues={{
              avatar: null,
              first_name: person?.first_name,
              last_name: person?.last_name,
            }}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const formData = new FormData();
                if (values?.avatar) {
                  formData.append("avatar", values?.avatar);
                }
                formData.append("first_name", values?.first_name);
                formData.append("last_name", values?.last_name);

                await urlActions.patch(
                  `/users/${userId}/`,
                  formData,
                  authenticationHeader
                );
                setLoading(false);
                handleClose();
                window.location.reload();
              } catch (error) {
                console.error("Update failed", error);
                setLoading(false);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-3">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={(e) => setFieldValue("avatar", e.target.files[0])}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter your first name"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter your last name"
                    className="form-control"
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline-primary"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm text-dark"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Settings;
