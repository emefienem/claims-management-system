import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: "Bearer dummy-token",
  },
});

export const generateMrf = (claims: any[]) => api.post("/generate-mrf", { claims });

export const fetchMrfFiles = () => api.get("/mrf-files");
