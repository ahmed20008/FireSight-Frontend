import {createSelector} from "reselect";

const storeClosure = (store) => store;

export const getCurrentUser = createSelector(storeClosure, (store) => {
  return {
    ...store.authUser,
  }
});