import axios from "axios";

const baseURL = "api/persons";

export const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

export const create = (newObj) => {
  const req = axios.post(baseURL, newObj);
  return req.then((res) => res.data);
};

export const update = (id, newObj) => {
  const req = axios.put(`${baseURL}/${id}`, newObj);
  return req.then((res) => res.data);
};

export const erase = (id) => {
  const req = axios.delete(`${baseURL}/${id}`);
  return req.then((res) => res.data);
};
