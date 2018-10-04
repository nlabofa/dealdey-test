import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";
const initialState = {
  deals: null,
  moredeals: null,
  dealdetail: null
};

const setDeals = (state, action) => {
  return updateObject(state, { deals: action.deals });
};
const loadMoreDeals = (state, action) => {
  return updateObject(state, {
    moredeals: action.moredeals
  });
};
const dealDetail = (state, action) => {
  return updateObject(state, {
    dealdetail: action.dealdetail
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEALS:
      return setDeals(state, action);
    case actionTypes.MORE_DEALS_LOADED:
      return loadMoreDeals(state, action);
    case actionTypes.DEAL_DETAIL_LOADED:
      return dealDetail(state, action);
    default:
      return state;
  }
};

export default reducer;
