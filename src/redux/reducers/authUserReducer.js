import { UPDATE_CURRENT_USER } from "../types";
import cloneDeep from "lodash/cloneDeep";
import { mapObject } from "../../utils/generalHelper";

const initialState = {
  _id: null,
  name: null,
  email: null,
  verified: null,
  permissions: null,
  phone: null,
  address: {
    address: null,
    city: null,
    state: null,
    zipcode: null,
  },
  fire_dept_id: null,
  fire_dept_address: {
    _id: null,
    address: {
      address: null,
      city: null,
      state: null,
      zipcode: null,
    },
  },
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