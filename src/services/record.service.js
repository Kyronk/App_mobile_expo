import { axiosInstance } from "./axios";

class RecordService {
  getAllRecord() {
    return axiosInstance
      .get("/api/record/all-record")
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default new RecordService();
