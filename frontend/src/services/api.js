import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSignals = () => API.get("/signals");
export const createSignal = (data) => API.post("/signals", data);
export const deleteSignal = (id) => API.delete(`/signals/${id}`);