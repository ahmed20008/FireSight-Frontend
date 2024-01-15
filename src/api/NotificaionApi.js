import axios from "axios";

const UPDATE_EVENT_PAYLOAD = {
  event_check: {
    event_type: "old",
    status: ""
  }
}

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

export async function getEvent(_id) {
  return await axios
    .get(`/event/${_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
export async function updateEvent(_id, payload = UPDATE_EVENT_PAYLOAD) {
  return await axios
    .put(`/event-check/${_id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}