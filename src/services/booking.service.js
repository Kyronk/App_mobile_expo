import { axiosInstance } from "./axios";

class BookingService {
  createBooking(userData) {
    return axiosInstance
      .post("/api/booking/create", userData)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
  getHistoryBooking() {
    return axiosInstance
      .get("/api/booking/history-booking")
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default new BookingService();
