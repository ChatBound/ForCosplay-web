import axios from "axios";

export const createUserCart = async (token, cart) => {
  // code body
  return axios.post("https://for-cosplay-api.vercel.app/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  // code body
  return axios.get("https://for-cosplay-api.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (token, formData) => {
  return axios.patch(
    "https://for-cosplay-api.vercel.app/api/user/update-profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const saveAddress = async (token, address) => {
  // code body
  return axios.post(
    "https://for-cosplay-api.vercel.app/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  // code body
  return axios.post("https://for-cosplay-api.vercel.app/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  // code body
  return axios.get("https://for-cosplay-api.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getRentals = async (token) => {
  // code body
  return axios.get("https://for-cosplay-api.vercel.app/api/user/rentals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const returnRental = async (token) => {
  // code body
  return axios.post("https://for-cosplay-api.vercel.app/api/user/return-rental", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

