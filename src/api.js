import axios from "axios";

export const fetchProducts = async (category) => {
  // 3. trigger new API
  const response = await axios.get(
    "http://localhost:5000/products?" +
      (category !== "" ? "category=" + category : "")
  );
  return response.data; // movies data from express
};

export const getProduct = async (id) => {
  const response = await axios.get("http://localhost:5000/products/" + id);
  return response.data;
};

export const addProduct = async (data) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:5000/products",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const updateProduct = async ({ id, data }) => {
  const response = await axios({
    method: "PUT",
    url: "http://localhost:5000/products/" + id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};

export const deleteProduct = async (product_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:5000/products/" + product_id,
  });
  return response.data;
};
