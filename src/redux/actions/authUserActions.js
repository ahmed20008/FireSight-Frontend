import {UPDATE_CURRENT_USER} from "../types";

export const updateCurrentUser = (user) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: {
      user,
    },
  };
};
