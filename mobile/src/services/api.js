import axios from "axios";

const api = axios.create({
  baseURL: "http://seu_ip_aqui:3334",
});

export default api;
