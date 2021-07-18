import { axiosInstance } from "./axios";
class CustomerService {
  register(userData, expo_token) {
    return axiosInstance
      .post("/api/customer/register", { data: userData, expo_token })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  updateProfile(userData) {
    return axiosInstance
      .post("/api/customer/update-profile", userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  changePassword(userData) {
    return axiosInstance
      .post("/api/customer/change-password", userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  forgotPassword(userData) {
    return axiosInstance
      .post("/api/customer/forgot-password", userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  verifyOTP(userData) {
    return axiosInstance
      .post("/api/customer/verify-otp", userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default new CustomerService();
