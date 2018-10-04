import * as actionTypes from "./actionTypes";

export const BigLoaderStart = () => {
  return {
    type: actionTypes.BIG_LOADER_START
  };
};
export const BigLoaderStop = () => {
  return {
    type: actionTypes.BIG_LOADER_STOP
  };
};
export const DealLoaderStart = () => {
  return {
    type: actionTypes.LOADING_MORE_DEALS_START
  };
};
export const DealLoaderStop = () => {
  return {
    type: actionTypes.LOADING_MORE_DEALS_STOP
  };
};
