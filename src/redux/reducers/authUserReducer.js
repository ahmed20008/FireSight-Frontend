import { GET_CURRENT_USER, UPDATE_CURRENT_USER } from "../types";
import { cloneDeep } from "lodash";
import { mapObject } from "../../utils/generalHelper";

const initialState = {
  _id: null,
  name: null,
  email: null,
  // permissions: {
  //   permission: null,
  // }
};

const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      // Ensure that mapObject is modifying stateClone in place
      const stateClone = cloneDeep(state);
      mapObject(stateClone, action.payload.user);

      return {
        ...stateClone,
      };

    case GET_CURRENT_USER:
      return state;

    // Add a default case to handle unspecified actions
    default:
      return state;
  }
};

export default authUserReducer;
