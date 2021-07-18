import { axiosInstance } from "./axios";

class AuthService {
  login(userData, expo_token) {
    return axiosInstance
      .post("/api/auth/customer-login", { data: userData, expo_token })
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  logout() {
    return axiosInstance
      .post("/api/auth/customer-logout")
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default new AuthService();
