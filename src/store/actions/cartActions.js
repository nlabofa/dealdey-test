import axios from "axios";
import * as actionTypes from "./actionTypes";
import { Actions } from "react-native-router-flux";

import {
  BigLoaderStart,
  BigLoaderStop,
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
export const DealsDetailsSuccess = (dispatch, data) => {
  dispatch({
    type: actionTypes.DEAL_DETAIL_LOADED,
    dealdetail: data
  });
  Actions.dealdetail({ dealdetail: data });
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
