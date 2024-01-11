import axios from "axios";

const ADD_MEMBER_PAYLOAD = {
  name: null,
  phone: null,
  email: null,
  address: {
    address: null,
    city: null,
    state: null,
    zipcode: null,
  },
  permissions: null,
  fire_dept_id: "",
  verified: "true",
};

const UPDATE_MEMBER_PAYLOAD = {
  name: null,
  phone: null,
  email: null,
  address: {
    address: null,
    city: null,
    state: null,
    zipcode: null,
  },
  permissions: null,
  fire_dept_id: "",
  verified: "true",
};

export async function addNewMember(payload = ADD_MEMBER_PAYLOAD) {
  return await axios
    .post("/add-user", payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export async function allVerifiedUsers() {
  return await axios
    .get("/all-users", {
      params: {
        verified: true,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function updateMember(_id, payload = UPDATE_MEMBER_PAYLOAD) {
  return await axios
    .put(`/update-user/${_id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};