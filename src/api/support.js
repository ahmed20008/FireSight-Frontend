import axios from "axios";

const SUPPORT_PAYLOAD = {
  user_id: null,
  category: null,
  subject: null,
  message: null,
};

export async function sendSupport(payload = SUPPORT_PAYLOAD) {
  return await axios.post('/support', payload)
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};

export async function supportData() {
  return await axios.get('/support')
    .then(response => {
      return response.data

    }).catch(error => {
      throw error.response.data
    })
};