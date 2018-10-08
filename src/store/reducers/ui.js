import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  largeloading: false,
  smalloading: false,
  loadingmoredeals: false
};

const BigLoaderStart = state => {
  return updateObject(state, { largeloading: true });
};
const BigLoaderStop = state => {
  return updateObject(state, { largeloading: false });
};
const SmalLoaderStart = state => {
  return updateObject(state, { smalloading: true });
};
const SmalLoaderStop = state => {
  return updateObject(state, { smalloading: false });
};
const DealLoaderStart = state => {
  return updateObject(state, { loadingmoredeals: true });
};
const DealLoaderStop = state => {
  return updateObject(state, { loadingmoredeals: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BIG_LOADER_START:
      return BigLoaderStart(state);
    case actionTypes.BIG_LOADER_STOP:
      return BigLoaderStop(state);
    case actionTypes.SMALL_LOADER_START:
      return SmalLoaderStart(state);
    case actionTypes.SMALL_LOADER_STOP:
      return SmalLoaderStop(state);
    case actionTypes.LOADING_MORE_DEALS_START:
      return DealLoaderStart(state);
    case actionTypes.LOADING_MORE_DEALS_STOP:
      return DealLoaderStop(state);
    default:
      return state;
  }
};

export default reducer;
