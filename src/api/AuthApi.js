import axios from "axios";

const LOGIN_PAYLOAD = {
  email: null,
  password: null,
};

const SIGNUp_PAYLOAD = {
  name: null,
  email: null,
  phone: null,
  address: {
    address: null,
    city: null,
    state: null,
    zipcode: null,
  },
};

const UPDATE_PASSWORD_PAYLOAD = {
  password: null,
};

export async function signIn(payload = LOGIN_PAYLOAD) {
  return await axios
    .post("/login", payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function signUp(payload = SIGNUp_PAYLOAD) {
  return await axios
    .post("/signup", payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function forgetPassword(payload = {email: null}) {
  return await axios
    .post("/forget-password", payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function updatePassword(payload = UPDATE_PASSWORD_PAYLOAD) {
  return await axios
    .post(`/update-password/:_id/:token`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function logout() {
  return await axios
    .post("/logout")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export async function me(token = null) {
  return await axios
    .get("/me", {
      params: {
        token: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
