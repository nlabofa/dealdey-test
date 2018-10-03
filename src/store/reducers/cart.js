import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";
const initialState = {
  deals: null
};

const setDeals = (state, action) => {
  return updateObject(state, { deals: action.deals });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEALS:
      return setDeals(state, action);
    default:
      return state;
  }
};

export default reducer;
