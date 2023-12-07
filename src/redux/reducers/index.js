import { combineReducers } from '@reduxjs/toolkit';

import authUser from "./authUserReducer";

export default combineReducers({
  authUser,
});
