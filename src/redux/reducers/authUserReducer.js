import {UPDATE_CURRENT_USER} from "../types";
import cloneDeep from "lodash/cloneDeep";
import { mapObject } from "../../utils/generalHelper";

const initialState = {
  _id: null,
  name: null,
  email: null,
  verified: null,
  permissions: [],
};

const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      const stateClone = cloneDeep(state);
      mapObject(stateClone, action.payload.user);

      return {
        ...stateClone,
      };

    default:
      return state;
  }
};

export default authUserReducer;