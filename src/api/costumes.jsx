import axios from "axios";

export const createProduct = async (token, form) => {
  // code body
  console.log("Form data being sent:", form);
  return axios.post("https://for-cosplay-api.vercel.app/api/costumes", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  // code body
  return axios.get("https://for-cosplay-api.vercel.app/api/costumes/" + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get("https://for-cosplay-api.vercel.app/api/costume/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete("https://for-cosplay-api.vercel.app/api/costume/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("https://for-cosplay-api.vercel.app/api/costume/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://for-cosplay-api.vercel.app/api/costumes/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    "https://for-cosplay-api.vercel.app/api/costumes/images/remove",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const searchFilters = async (arg) => {
    // code body
    return axios.post("https://for-cosplay-api.vercel.app/api/costumes/search/filters", arg);
  };
  
  export const listProductBy = async (sort, order, limit) => {
    // code body
    return axios.post("https://for-cosplay-api.vercel.app/api/costumes/filter", {
      sort,
      order,
      limit,
    });
  };
  