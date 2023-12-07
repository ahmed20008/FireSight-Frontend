import { GET_CURRENT_USER, UPDATE_CURRENT_USER } from "../types";

export const getCurrentUser = () => {
  return {
    type: GET_CURRENT_USER,
  };
};

export const updateCurrentUser = (user) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: {
      user,
    },
  };
};