import axios from "axios";
import * as actionTypes from "./actionTypes";

const apiURL = "https://pre-multi.dealdey.com/api/external/v1";
const apiKey = "DTPDzKMV7SRxFHyXdzyzVJd";

export const setDeals = data => {
  return {
    type: actionTypes.SET_DEALS,
    deals: data
  };
};
export const InitDeals = () => {
  return dispatch => {
    axios
      .get(apiURL + "/deals?access_key=" + apiKey)
      .then(response => {
        console.log(response);
        dispatch(setDeals(response.data));
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.response.data.message);
      });
  };
};
