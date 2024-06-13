"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NavbarComponent() {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navLinks = [
    {
      id: 1,
      name: "Dashboard",
      path: "/suite/dashboard",
      icon: "bi-speedometer2",
    },
    { id: 2, name: "Clients", path: "/suite/clients", icon: "bi-people" },
    // {
    //   id: 3,
    //   name: "Contracts",
    //   path: "/suite/contracts",
    //   icon: "bi-file-earmark-text",
    // },
    // { id: 4, name: "Payments", path: "/suite/payments", icon: "bi-wallet2" },
    { id: 5, name: "Settings", path: "/suite/settings", icon: "bi-gear" },
  ];

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg mb-3">
        <div className="container-fluid">
          {/* <button
            className="btn btn-outline-light me-2"
            type="button"
            onClick={handleShow}
          >
            <i className="bi bi-list"></i>
          </button> */}
          <Link href="/suite/dashboard" className="navbar-brand">
            Business Suite
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end text-uppercase fw-semibold"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.id}>
                  <Link href={link.path} className="nav-link">
                    <i className={`bi ${link.icon} me-2`}></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {session?.user?.avatar ? (
                    <Image
                      src={session?.user?.avatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  ) : (
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  )}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person-circle me-2"></i>Account
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => signOut()}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <div
        className={`offcanvas offcanvas-start ${show ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <Link href={link.path} className="nav-link">
                  <i className={`bi ${link.icon} me-2`}></i>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </>
  );
}

export default NavbarComponent;
