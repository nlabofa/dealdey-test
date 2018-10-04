import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  largeloading: false
};

const BigLoaderStart = state => {
  return updateObject(state, { largeloading: true });
};
const BigLoaderStop = state => {
  return updateObject(state, { largeloading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BIG_LOADER_START:
      return BigLoaderStart(state);
    case actionTypes.BIG_LOADER_STOP:
      return BigLoaderStop(state);
    default:
      return state;
  }
};

export default reducer;
