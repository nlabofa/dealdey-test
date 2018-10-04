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
