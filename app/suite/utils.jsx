/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// src/utils/utils.jsx

import { urlActions } from "../tools/api";

export const fetchUser = async (userId, authenticationHeader, setPerson) => {
  if (!userId) {
    return;
  }

  try {
    const response = await urlActions.get(
      `/users/${userId}/`,
      authenticationHeader
    );
    setPerson(response.data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

export const getClients = async (userId, authenticationHeader, setClients) => {
  if (!userId) {
    return;
  }

  try {
    const response = await urlActions.get(`/clients/`, authenticationHeader);
    setClients(response?.data?.results);
  } catch (error) {
    console.error("Failed to fetch clients data:", error);
  }
};
