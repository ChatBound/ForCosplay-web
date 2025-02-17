import axios from "axios";

// https://forcosplay.com/api/admin/orders

export const getOrdersAdmin = async (token) => {
  // code body
  return axios.get("https://forcosplay.com/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderBy, status) => {
  // code body
  return axios.put(
    "https://forcosplay.com/api/admin/order-status",
    {
      orderBy,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  // code body
  return axios.get("https://forcosplay.com/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  // code body
  return axios.post("https://forcosplay.com/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  // code body
  return axios.post("https://forcosplay.com/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
