import axios from "axios";
import * as actionTypes from "./actionTypes";
import { Actions } from "react-native-router-flux";
import { getStateName } from "../utility";
import {
  BigLoaderStart,
  BigLoaderStop,
  SmalLoaderStart,
  SmalLoaderStop,
  DealLoaderStart,
  DealLoaderStop
} from "./index";
const apiURL = "https://pre-multi.dealdey.com/api/external/v1";
const apiKey = "DTPDzKMV7SRxFHyXdzyzVJd";

export const setDeals = data => {
  return {
    type: actionTypes.SET_DEALS,
    deals: data
  };
};
export const MoreDeals = data => {
  return {
    type: actionTypes.MORE_DEALS_LOADED,
    moredeals: data
  };
};
export const saveLocationListing = data => {
  return {
    type: actionTypes.SAVE_LOCATION_LIST,
    locationlist: data
  };
};
export const saveStateName = name => {
  return {
    type: actionTypes.SAVE_STATE_NAME,
    statename: name
  };
};
export const areaListFetched = name => {
  return {
    type: actionTypes.AREA_LIST_FETCHED,
    statename: name
  };
};
export const createCartAction = data => {
  return {
    type: actionTypes.CART_CREATED,
    cartdetail: data
  };
  //Actions.cartlist({ cartdetail: data });
};
export const DealVariantAction = data => {
  return {
    type: actionTypes.SET_DEAL_VARIANTS,
    variantdetail: data
  };
};
export const DealsDetailsSuccess = (dispatch, data) => {
  dispatch({
    type: actionTypes.DEAL_DETAIL_LOADED,
    dealdetail: data
  });
  Actions.dealdetail({ dealdetail: data });
};
export const saveOrderDetail = (dispatch, data) => {
  dispatch({
    type: actionTypes.SAVE_ORDER_DETAIL,
    orderdetail: data
  });
  Actions.ordersuccess({ orderdetail: data });
};
export const checkoutDetailAction = (dispatch, data) => {
  dispatch({
    type: actionTypes.CHECKOUT_DETAIL_LOADED,
    checkoutdetail: data
  });
  Actions.checkoutdetail({ checkoutdetail: data });
};
export const ItemAddedToCartSuccess = (dispatch, data) => {
  dispatch({
    type: actionTypes.ITEM_ADDED_CART_SUCCESS,
    cartdetail: data
  });
  Actions.cartlist({ cartdetail: data });
};
export const InitDeals = () => {
  return dispatch => {
    dispatch(BigLoaderStart());
    axios
      .get(apiURL + "/deals?access_key=" + apiKey)
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response);
        dispatch(setDeals(response.data.deals));
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
        alert("An error occured");
      });
  };
};
export const LoadMoreDeals = page => {
  //`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`

  return dispatch => {
    dispatch(DealLoaderStart());
    axios
      .get(apiURL + "/deals?access_key=" + apiKey + "&page=" + page)
      .then(response => {
        dispatch(DealLoaderStop());
        console.log(response);
        dispatch(MoreDeals(response.data.deals));
      })
      .catch(err => {
        dispatch(DealLoaderStop());
        console.log(err);
        console.log(err.response.data.message);
        alert("An error occured");
      });
  };
};
export const FetchDealsDetais = id => {
  return dispatch => {
    dispatch(BigLoaderStart());
    axios
      .get(`${apiURL}/deals/${id}?access_key=${apiKey}`)
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response);
        DealsDetailsSuccess(dispatch, response.data.deal);
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err);
        // console.log(err.response.data.message);
        alert("An error occured");
      });
  };
};
export const createCart = () => {
  return dispatch => {
    axios
      .get(apiURL + "/carts?access_key=" + apiKey)
      .then(response => {
        console.log(response.data);
        console.log("cart created");
        dispatch(createCartAction(response.data));
      })
      .catch(err => {
        console.log(err.response);
        console.log("cart creation error");
        console.log(err.response.data.message);
      });
  };
};
export const addCart = (cart_id, contentData) => {
  return (dispatch, getState) => {
    console.log(cart_id);
    console.log(contentData);
    // console.log(getState().cart.cartdetail);

    dispatch(BigLoaderStart());
    axios
      .post(
        `${apiURL}/carts/${cart_id}/cart_items?access_key=${apiKey}`,
        contentData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response.data);
        if (response.data.success === true) {
          console.log("cart added success");
          ItemAddedToCartSuccess(dispatch, response.data);
        } else {
          console.log("cart error occured");
          console.log(response.data.error_message);
        }
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        //console.log(err.response.data.message);
        alert("An error occured");
      });
  };
};
export const removeItemFromCart = (cart_id, cart_item_id) => {
  return dispatch => {
    dispatch(BigLoaderStart());
    axios
      .post(
        `${apiURL}/carts/${cart_id}/cart_items/${cart_item_id}/remove?access_key=${apiKey}`
      )
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response.data);
        if (response.data.success === true) {
          console.log("item removed from cart success");
          ItemAddedToCartSuccess(dispatch, response.data);
        } else {
          console.log("cart error occured");
          console.log(response.data.error_message);
        }
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        //console.log(err.response.data.message);
        alert("An error occured");
      });
  };
};

export const addItemToCart = (cart_id, deal_id, variant_id, quantity) => {
  return dispatch => {
    const contentData = {
      deal_id: deal_id,
      variant_id: variant_id,
      cart_item: { quantity: quantity }
    };
    dispatch(addCart(cart_id, contentData));
  };
};

export const getDealVariant = id => {
  return dispatch => {
    axios
      .get(`${apiURL}/deals/${id}/variants?access_key=${apiKey}`)
      .then(response => {
        console.log(response.data);
        console.log("variant fetched");
        dispatch(DealVariantAction(response.data));
      })
      .catch(err => {
        console.log(err.response);
        console.log("varaint fetch error");
        console.log(err.response.data.message);
      });
  };
};
export const getCheckOutDetail = id => {
  return dispatch => {
    dispatch(BigLoaderStart());
    axios
      .get(`${apiURL}/carts/${id}/payment_options?access_key=${apiKey}`)
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response.data);
        checkoutDetailAction(dispatch, response.data);
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const getStateListing = () => {
  return dispatch => {
    dispatch(BigLoaderStart());
    axios
      .get(`${apiURL}/states?access_key=${apiKey}`)
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response.data);
        dispatch(saveLocationListing(response.data.states));
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const getAreaListing = id => {
  return dispatch => {
    const statename = getStateName(id);
    console.log(statename);
    dispatch(SmalLoaderStart());
    axios
      .get(`${apiURL}/areas?state_id=${id}&access_key=${apiKey}`)
      .then(response => {
        dispatch(SmalLoaderStop());
        console.log(response.data);
        dispatch(saveLocationListing(response.data.areas));
        dispatch(areaListFetched(statename));
      })
      .catch(err => {
        dispatch(SmalLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const createShippingAddress = (id, contentData, amount) => {
  return dispatch => {
    console.log(contentData);
    dispatch(BigLoaderStart());

    axios
      .post(
        `${apiURL}/carts/${id}/shipping_address?access_key=${apiKey}`,
        contentData
      )
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          dispatch(BigLoaderStop());
          Actions.push("userform");
        } else {
          dispatch(BigLoaderStop());
          alert(response.data.cart.error_messages);
        }
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const completeOrder = (id, total_amount) => {
  return dispatch => {
    const orderData = {
      amount: total_amount,
      order_reference: Math.floor(Date.now() / 1000)
    };
    console.log(orderData);
    axios
      .post(`${apiURL}/carts/${id}/complete?access_key=${apiKey}`, orderData)
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          dispatch(getOrderDetail(response.data.order_id));
        }
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const getOrderDetail = id => {
  return dispatch => {
    axios
      .get(`${apiURL}/orders/${id}?access_key=${apiKey}`)
      .then(response => {
        dispatch(BigLoaderStop());
        console.log(response.data);
        saveOrderDetail(dispatch, response.data.order);
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
export const createUserInfo = (
  cart_id,
  is_shippable,
  total_amount,
  firstname,
  mobile,
  email
) => {
  return dispatch => {
    const postData = {
      user: {
        firstname: firstname,
        mobile: mobile,
        email: email
      }
    };
    dispatch(BigLoaderStart());
    axios
      .post(`${apiURL}/carts/${cart_id}/user?access_key=${apiKey}`, postData)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          dispatch(completeOrder(cart_id, total_amount));
        }
      })
      .catch(err => {
        dispatch(BigLoaderStop());
        alert("Pls ensure you entered valid email/phone no");
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
