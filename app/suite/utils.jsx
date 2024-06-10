/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// src/utils/utils.jsx

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getUser = async (userId, authenticationHeader) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/`,
      {
        method: "GET",
        headers: {
          ...authenticationHeader.headers,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const fetchUserData = async (
  userId,
  authenticationHeader,
  setPerson
) => {
  if (!userId) {
    return;
  }

  try {
    const userData = await getUser(userId, authenticationHeader);
    setPerson(userData);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

export const fetchClients = async (
  userId,
  authenticationHeader,
  setClients
) => {
  if (!userId) {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/clients/`, {
      method: "GET",
      headers: {
        ...authenticationHeader.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setClients(data?.results);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
