/* eslint-disable react-hooks/exhaustive-deps */
// src/utils/utils.jsx

import { useState, useEffect } from "react";

export const getUser = async (userId, authenticationHeader) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/`,
      {
        method: "GET",
        ...authenticationHeader,
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

export const useFetchUser = (userId, authenticationHeader) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        return;
      }

      try {
        const userData = await getUser(userId, authenticationHeader);
        setUser(userData);
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, error };
};
