import axios from "axios";

export async function allUsers() {
  return await axios
    .get("/all-users", {
      params: {
        verified: false,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function deleteUsers(_id) {
  return await axios
    .delete(`delete-user/${_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function allRequests() {
  return await axios
    .get("/all-users", {
      params: {
        verified: false,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}