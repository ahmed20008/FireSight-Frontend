import axios from "axios";

export async function allEvents() {
  return await axios
    .get("/all-events")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}