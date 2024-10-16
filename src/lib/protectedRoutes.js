import axios from "axios";
import { getLocalStorage } from "./localStorage";

const protectedRoutes = async() => {
  const token = getLocalStorage("token");
  if (!token) {
    window.location.href = "/login";
  }

  try {
    const api = "http://localhost:4000/auth/me";
    const response = await axios.post(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    return null;
  }
};

export default protectedRoutes;
