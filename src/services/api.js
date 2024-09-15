import axios from "axios";

const api = axios.create({
  baseURL: "https://cliff-elastic-snipe.glitch.me",
});

export default api;
