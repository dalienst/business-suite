/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import { urlActions } from "../tools/api";
import { cache } from "react";

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

export const getClientDetail = cache(
  async (userId, slug, authenticationHeader, setClient) => {
    if (!userId) {
      return;
    }

    try {
      const response = await urlActions.get(
        `/clients/${slug}/`,
        authenticationHeader
      );
      setClient(response.data);
    } catch (error) {}
  }
);

export const getInvoiceDetail = cache(
  async (userId, slug, authenticationHeader, setInvoice) => {
    if (!userId) {
      return;
    }
    try {
      const response = await urlActions(
        `/invoices/${slug}/`,
        authenticationHeader
      );
      setInvoice(response.data);
    } catch (error) {}
  }
);

