import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cart";
import uiReducer from "./ui";

let middleware = [thunk];

const rootReducer = combineReducers({
  cart: cartReducer,
  ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middleware = [...middleware];
} else {
  middleware = [...middleware];
}

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default configureStore;
