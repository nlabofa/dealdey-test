import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";
const initialState = {
  deals: null,
  moredeals: null,
  dealdetail: null,
  cartdetail: null,
  variantdetail: null,
  checkoutdetail: null,
  orderdetail: null
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
const createCart = (state, action) => {
  return updateObject(state, {
    cartdetail: action.cartdetail
  });
};
const ItemAddedToCart = (state, action) => {
  return updateObject(state, {
    cartdetail: action.cartdetail
  });
};
const getDealVariant = (state, action) => {
  return updateObject(state, {
    variantdetail: action.variantdetail
  });
};
const getCheckoutDetail = (state, action) => {
  return updateObject(state, {
    checkoutdetail: action.checkoutdetail
  });
};
const saveOrderDetail = (state, action) => {
  return updateObject(state, {
    orderdetail: action.orderdetail
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
    case actionTypes.CART_CREATED:
      return createCart(state, action);
    case actionTypes.SET_DEAL_VARIANTS:
      return getDealVariant(state, action);
    case actionTypes.ITEM_ADDED_CART_SUCCESS:
      return ItemAddedToCart(state, action);
    case actionTypes.CHECKOUT_DETAIL_LOADED:
      return getCheckoutDetail(state, action);
    case actionTypes.SAVE_ORDER_DETAIL:
      return saveOrderDetail(state, action);
    default:
      return state;
  }
};

export default reducer;
